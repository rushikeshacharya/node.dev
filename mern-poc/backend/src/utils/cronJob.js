const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("../utils/sendEmail");

// This job will run at 12 AM in the morning everyday
cron.schedule("0 0 * * * *", async () => {
  /**
   * R -> L
   * * seconds (optional)
   * * minutes
   * * hour
   * * day of the month
   * * month
   * * day of the week
   */

  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      try {
        const res = await sendEmail.run(
          "New Friend Requests pending for " + email
        );
      } catch (error) {
        console.log("Error", error);
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
});
