import Report from "../models/Report.js";

/* ================= ADMIN ================= */

// Create report
export const createReport = async (req, res) => {
  const report = await Report.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json(report);
};

// Update report
export const updateReport = async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(report);
};

export const getReportById = async (req, res) => {
  const report = await Report.findById(req.params.id);
  res.json(report);
}
// Delete report
export const deleteReport = async (req, res) => {
  await Report.findByIdAndDelete(req.params.id);
  res.json({ message: "Report deleted successfully" });
};

/* ================= EMPLOYEE ================= */

// View reports (department wise)
export const getEmployeeReports = async (req, res) => {
  const { type, page = 1 } = req.query;
  const limit = 5;
// console.log("show",req.user.department)
  const filter = {
    department: req.user.department,
    type,
  };

  const reports = await Report.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Report.countDocuments(filter);

  res.json({
    reports,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
  });
};

/**
//  * desc    Admin - View Reports with filters
//  * route   GET /api/reports/admin
//  * access  Admin
//  */

/**
 * desc    Admin - View Reports with filters
 * route   GET /api/reports/admin
 * access  Admin
 */
export const getAdminReports = async (req, res) => {
  try {
    const {
      department,
      type, // daily | weekly | monthly | yearly
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (department) filter.department = department;
    if (type) filter.type = type;

    const reports = await Report.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalReports = await Report.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: reports,
      pagination: {
        total: totalReports,
        page: Number(page),
        pages: Math.ceil(totalReports / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};
