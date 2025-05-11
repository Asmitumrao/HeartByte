"""
Machine learning models for heart failure readmission prediction.
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, classification_report
)
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import shap
from typing import Dict, Any, Tuple, List, Union


def train_logistic_regression(
    X_train: pd.DataFrame, 
    y_train: pd.Series, 
    **kwargs
) -> LogisticRegression:
    """
    Train a logistic regression model for readmission prediction.
    
    Args:
        X_train: Training features
        y_train: Training target
        **kwargs: Parameters to pass to LogisticRegression
    
    Returns:
        Trained logistic regression model
    """
    # Set defaults with potential overrides
    params = {
        'C': 1.0,
        'class_weight': 'balanced',
        'random_state': 42,
        'max_iter': 1000,
        'solver': 'liblinear'
    }
    params.update(kwargs)
    
    # Train model
    model = LogisticRegression(**params)
    model.fit(X_train, y_train)
    
    return model


def train_random_forest(
    X_train: pd.DataFrame, 
    y_train: pd.Series, 
    **kwargs
) -> RandomForestClassifier:
    """
    Train a random forest model for readmission prediction.
    
    Args:
        X_train: Training features
        y_train: Training target
        **kwargs: Parameters to pass to RandomForestClassifier
    
    Returns:
        Trained random forest model
    """
    # Set defaults with potential overrides
    params = {
        'n_estimators': 100,
        'max_depth': None,
        'min_samples_split': 2,
        'min_samples_leaf': 1,
        'class_weight': 'balanced',
        'random_state': 42
    }
    params.update(kwargs)
    
    # Train model
    model = RandomForestClassifier(**params)
    model.fit(X_train, y_train)
    
    return model


def train_xgboost(
    X_train: pd.DataFrame, 
    y_train: pd.Series, 
    **kwargs
) -> XGBClassifier:
    """
    Train an XGBoost model for readmission prediction.
    
    Args:
        X_train: Training features
        y_train: Training target
        **kwargs: Parameters to pass to XGBClassifier
    
    Returns:
        Trained XGBoost model
    """
    # Set defaults with potential overrides
    params = {
        'n_estimators': 100,
        'learning_rate': 0.1,
        'max_depth': 4,
        'min_child_weight': 1,
        'subsample': 0.8,
        'colsample_bytree': 0.8,
        'gamma': 0,
        'random_state': 42,
        'scale_pos_weight': 10  # For class imbalance
    }
    params.update(kwargs)
    
    # Train model
    model = XGBClassifier(**params)
    model.fit(X_train, y_train)
    
    return model


def evaluate_model(
    model: Any, 
    X_test: pd.DataFrame, 
    y_test: pd.Series,
    feature_names: List[str] = None
) -> Dict[str, Any]:
    """
    Evaluate model performance on test data.
    
    Args:
        model: Trained model
        X_test: Test features
        y_test: Test target
        feature_names: List of feature names
    
    Returns:
        Dict with evaluation metrics
    """
    # Get predictions
    y_pred = model.predict(X_test)
    y_pred_proba = None
    if hasattr(model, "predict_proba"):
        y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Calculate metrics
    results = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1': f1_score(y_test, y_pred),
        'confusion_matrix': confusion_matrix(y_test, y_pred),
        'classification_report': classification_report(y_test, y_pred),
    }
    
    # Add ROC AUC if probabilistic predictions are available
    if y_pred_proba is not None:
        results['roc_auc'] = roc_auc_score(y_test, y_pred_proba)
    
    # Get feature importances if available
    if hasattr(model, "feature_importances_") and feature_names is not None:
        importances = model.feature_importances_
        indices = np.argsort(importances)[::-1]
        results['feature_importance'] = {
            'names': [feature_names[i] for i in indices],
            'values': [importances[i] for i in indices]
        }
    elif hasattr(model, "coef_") and feature_names is not None:
        importances = np.abs(model.coef_[0])
        indices = np.argsort(importances)[::-1]
        results['feature_importance'] = {
            'names': [feature_names[i] for i in indices],
            'values': [importances[i] for i in indices]
        }
    
    return results


def plot_model_evaluation(
    results: Dict[str, Any],
    model_name: str
) -> None:
    """
    Plot evaluation metrics for a model.
    
    Args:
        results: Dict with evaluation metrics
        model_name: Name of the model for plot titles
    """
    # Create figure with subplots
    fig, axs = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle(f'Model Evaluation: {model_name}', fontsize=16)
    
    # Confusion Matrix
    cm = results['confusion_matrix']
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=axs[0, 0])
    axs[0, 0].set_title('Confusion Matrix')
    axs[0, 0].set_ylabel('True Label')
    axs[0, 0].set_xlabel('Predicted Label')
    
    # Performance Metrics
    metrics = ['accuracy', 'precision', 'recall', 'f1']
    if 'roc_auc' in results:
        metrics.append('roc_auc')
    
    metric_values = [results[m] for m in metrics]
    sns.barplot(x=metrics, y=metric_values, ax=axs[0, 1])
    axs[0, 1].set_title('Performance Metrics')
    axs[0, 1].set_ylim(0, 1)
    axs[0, 1].set_ylabel('Score')
    
    # Feature Importances
    if 'feature_importance' in results:
        fi = results['feature_importance']
        # Plot top 10 features or all if less than 10
        n_features = min(10, len(fi['names']))
        sns.barplot(
            x=fi['values'][:n_features],
            y=fi['names'][:n_features],
            ax=axs[1, 0]
        )
        axs[1, 0].set_title('Top Feature Importances')
        axs[1, 0].set_xlabel('Importance')
    else:
        axs[1, 0].set_visible(False)
    
    # Classification Report as Text
    axs[1, 1].axis('off')
    axs[1, 1].text(
        0, 1, 
        f"Classification Report:\n\n{results['classification_report']}", 
        fontsize=10, 
        family='monospace'
    )
    
    plt.tight_layout()
    plt.subplots_adjust(top=0.9)
    plt.show()


def save_model(model: Any, filename: str) -> None:
    """
    Save a trained model to disk.
    
    Args:
        model: Trained model to save
        filename: Path to save the model
    """
    joblib.dump(model, filename)
    print(f"Model saved to {filename}")


def load_model(filename: str) -> Any:
    """
    Load a trained model from disk.
    
    Args:
        filename: Path to the saved model
    
    Returns:
        Loaded model
    """
    model = joblib.load(filename)
    print(f"Model loaded from {filename}")
    return model


def explain_model_with_shap(
    model: Any, 
    X: pd.DataFrame, 
    sample_size: int = None, 
    plot_type: str = 'summary'
) -> Tuple[Any, np.ndarray]:
    """
    Generate SHAP explanations for a model.
    
    Args:
        model: Trained model to explain
        X: Features to use for explanation (typically X_test)
        sample_size: Number of samples to use for explanation (None for all)
        plot_type: Type of SHAP plot ('summary', 'bar', 'beeswarm', 'waterfall', 'force')
    
    Returns:
        Tuple of (explainer, shap_values)
    """
    # Sample data if needed to speed up computation
    if sample_size is not None and sample_size < len(X):
        X_sample = X.sample(sample_size, random_state=42)
    else:
        X_sample = X
    
    # Create explainer based on model type
    if isinstance(model, XGBClassifier):
        explainer = shap.TreeExplainer(model)
    elif isinstance(model, RandomForestClassifier):
        explainer = shap.TreeExplainer(model)
    elif isinstance(model, LogisticRegression):
        explainer = shap.LinearExplainer(model, X_sample)
    else:
        # For other models, use KernelExplainer (slower but model-agnostic)
        explainer = shap.KernelExplainer(model.predict_proba, X_sample)
    
    # Calculate SHAP values
    shap_values = explainer.shap_values(X_sample)
    
    # For classifiers with 2 classes, SHAP values may be in a list where index 1 is for positive class
    if isinstance(shap_values, list) and len(shap_values) == 2:
        shap_values = shap_values[1]  # Use the positive class (readmission=1)
    
    # Create plot based on type
    if plot_type == 'summary':
        shap.summary_plot(shap_values, X_sample, show=False)
        plt.title('SHAP Feature Importance', fontsize=16)
        plt.tight_layout()
        plt.show()
    elif plot_type == 'bar':
        shap.summary_plot(shap_values, X_sample, plot_type='bar', show=False)
        plt.title('SHAP Mean Absolute Feature Importance', fontsize=16)
        plt.tight_layout()
        plt.show()
    elif plot_type == 'beeswarm':
        shap.plots.beeswarm(shap.Explanation(values=shap_values, 
                                             data=X_sample,
                                             feature_names=X_sample.columns))
    elif plot_type == 'waterfall':
        # Single prediction explanation (first instance)
        shap.waterfall_plot(shap.Explanation(values=shap_values[0], 
                                             data=X_sample.iloc[0],
                                             feature_names=X_sample.columns))
    elif plot_type == 'force':
        # Single prediction explanation (first instance)
        shap.force_plot(explainer.expected_value, 
                       shap_values[0], 
                       X_sample.iloc[0],
                       matplotlib=True)
    
    return explainer, shap_values


def plot_shap_dependence(
    shap_values: np.ndarray, 
    X: pd.DataFrame, 
    feature_to_plot: str,
    interaction_feature: str = None
) -> None:
    """
    Create a SHAP dependence plot to show how a feature affects model output.
    
    Args:
        shap_values: SHAP values from explainer
        X: Feature data used for explanation
        feature_to_plot: Feature to use for the x-axis
        interaction_feature: Optional feature to show interaction effects with
    """
    if interaction_feature:
        shap.dependence_plot(
            feature_to_plot, 
            shap_values, 
            X, 
            interaction_index=interaction_feature,
            show=False
        )
    else:
        shap.dependence_plot(
            feature_to_plot, 
            shap_values, 
            X,
            show=False
        )
    
    plt.title(f'SHAP Dependence Plot for {feature_to_plot}', fontsize=16)
    plt.tight_layout()
    plt.show()
