from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = os.getenv('GROQ_API_KEY')

@app.route('/api/diet', methods=['POST'])
def get_diet():
    data = request.json
    age = data['age']
    weight = data['weight']
    history = data['history']
    diet_type = data.get('dietType', 'Veg')  # Default: Veg
    
    # Make diet type case-insensitive
    diet_type = diet_type.lower()
    
    # Create strict diet guidelines based on type
    diet_guidelines = ""
    if diet_type == "veg":
        diet_guidelines = """
STRICT DIETARY RULES (VEGETARIAN):
- ❌ FORBIDDEN: All meat, poultry, fish, and seafood
- ✅ ALLOWED: Dairy products, eggs, plant-based foods
- Every meal MUST comply with vegetarian restrictions
"""
    elif diet_type == "vegan":
        diet_guidelines = """
STRICT DIETARY RULES (VEGAN):
- ❌ FORBIDDEN: All animal products (meat, fish, dairy, eggs, honey)
- ✅ ALLOWED: Only plant-based foods (vegetables, fruits, grains, legumes, nuts, seeds)
- Every meal MUST comply with vegan restrictions
- Double-check all ingredients to ensure no animal derivatives
"""
    elif diet_type == "nonveg":
        diet_guidelines = """
DIETARY RULES (NON-VEGETARIAN):
- ✅ ALLOWED: All foods including meat, poultry, fish, eggs, and dairy
- Include a balanced mix of protein sources
"""
    
    # Improved prompt with stronger constraints and explicit examples of violations
    prompt = f"""You are creating a 7-day {diet_type} diet plan with ZERO introduction, explanation, or disclaimers.

Client details:
- Age: {age}
- Weight: {weight} kg
- Medical History: {history}

{diet_guidelines}

CONTENT RESTRICTIONS:
- ⛔ DO NOT include any greetings, introductions, or conclusions
- ⛔ DO NOT include any medical advice, warnings, or disclaimers
- ⛔ DO NOT include any professional commentary
- ⛔ DO NOT explain your reasoning or choices

OUTPUT FORMAT:
Return ONLY a structured meal plan with this exact format for 7 days:

Day 1:
- Breakfast: [specific foods and portions]
- Lunch: [specific foods and portions]
- Dinner: [specific foods and portions]
- Snacks: [specific foods and portions]

Day 2:
- Breakfast: [specific foods and portions]
- Lunch: [specific foods and portions]
- Dinner: [specific foods and portions]
- Snacks: [specific foods and portions]

(Continue similarly up to Day 7)
"""

    headers = {
        'Authorization': f'Bearer {GROQ_API_KEY}',
        'Content-Type': 'application/json',
    }
    
    # Add specific system message to enforce diet type
    system_message = f"You are a professional dietician specialized in {diet_type} diets. Follow the user's instructions EXACTLY."
    
    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2  # Lower temperature for more consistent outputs
    }
    
    try:
        res = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
        
        if res.status_code != 200:
            return jsonify({"error": f"Failed to fetch from Groq API: {res.text}"}), res.status_code
        
        result = res.json()["choices"][0]["message"]["content"]
        
        # Post-processing to verify diet compliance
        if diet_type == "veg" and any(item in result.lower() for item in ["chicken", "beef", "pork", "fish", "salmon", "tuna", "meat", "seafood"]):
            return jsonify({"error": "Generated diet contains non-vegetarian items. Please try again."}), 400
        
        if diet_type == "vegan" and any(item in result.lower() for item in ["milk", "cheese", "yogurt", "cream", "butter", "egg", "honey", "chicken", "beef", "pork", "fish"]):
            return jsonify({"error": "Generated diet contains non-vegan items. Please try again."}), 400
            
        return jsonify({"plan": result})
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)