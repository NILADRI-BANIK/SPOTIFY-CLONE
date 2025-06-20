const TryCatch = (handeler) => {
    return async (req, res, next) => {
        try {
            await handeler(req, res, next);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }

    };
};

export default TryCatch;