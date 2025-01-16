const visitModel = require("../models/visitModel");

const incrementVisit = async (req, res) => {
    try {
      const result = await visitModel.findOneAndUpdate(
        {}, 
        { $inc: { totalVisits: 1 } }, 
        { new: true, upsert: true } 
      );
      res.status(200).json({ totalVisits: result.totalVisits });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update visit count" });
    }
  };

  const getVisitCount = async (req, res) => {
    try {
      const result = await visitModel.findOne({});
      res.status(200).json({ totalVisits: result ? result.totalVisits : 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch visit count" });
    }
  };

module.exports = { incrementVisit, getVisitCount };