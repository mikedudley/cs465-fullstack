/* GET travel view */
const travel = (req, res) => {
    res.rended('travel', { title: "Travlr Getaways" });
};

module.exports = {
    travel
}