
function success(message, data) {
    return {
        success: true,
        status: 200,
        message: message,
        data: data,
        error: null
    }
}

function failure(status, message, error) {
    return {
        success: false,
        status: status,
        message: message,
        data: null,
        error: error
    }
}

const response = {
    success: success,
    failure: failure
}

export default response;