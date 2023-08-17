const handlerErrors = (result, res) =>
    res.status(400).json({
        Error: result.error.issues.map((issue) => {
            return `${issue.path[0]}: ${issue.message}`;
        }),
    });

export default handlerErrors;