const dashboardRepository =
    require("../repositories/dashboardRepository");

const getDashboard = async (userId) => {

    const dashboard =
        await dashboardRepository.getDashboard(userId);

    return dashboard;

};

module.exports = {
    getDashboard,
};