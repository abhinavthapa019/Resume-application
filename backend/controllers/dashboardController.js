const dashboardService = require("../services/dashboardServices");

const getDashboard = async (req, res) => {

    try {

        const userId = req.user.id;

        const dashboard =
            await dashboardService.getDashboard(userId);

        res.status(200).json(dashboard);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    getDashboard,
};