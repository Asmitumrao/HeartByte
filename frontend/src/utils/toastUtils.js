import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleSuccess = (message) => {
    toast.success(message, {
        style: {
            background: '#333',
            color: '#fff',
            fontSize: '16px',
            padding: '12px'
          },
        // position: 'top-right',
        // autoClose: 2000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
    });
}

const handleError = (message) => {
    toast.error(message, {
        // style: {
        //     background: '#333',
        //     color: '#fff',
        //     fontSize: '16px',
        //     padding: '12px'
        //   },
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export {handleSuccess, handleError};

