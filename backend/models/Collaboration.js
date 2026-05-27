const mongoose = require('mongoose');

const collaborationSchema = mongoose.Schema(
  {
    collaborationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    brandName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    contactPersonName: { type: String, trim: true },
    designation: { type: String, trim: true },
    emailAddress: { type: String, trim: true, lowercase: true },
    phoneNumber: { type: String, trim: true },
    whatsappNumber: { type: String, trim: true },
    instagramHandle: { type: String, trim: true },
    websiteUrl: { type: String, trim: true },
    linkedinProfileUrl: { type: String, trim: true },
    collaborationType: {
      type: String,
      enum: ['Paid', 'Barter', 'Affiliate', 'Long-Term Partnership'],
      required: true,
    },
    estimatedValue: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    deliverables: [{ type: String, trim: true }],
    firstContactDate: { type: Date },
    lastConversationDate: { type: Date, required: true },
    nextFollowUpDate: { type: Date },
    notes: { type: String, default: '' },
    topicsDiscussed: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: [
        'New Lead',
        'Contacted',
        'Awaiting Response',
        'Negotiating',
        'Approved',
        'Product Shipped',
        'Content In Progress',
        'Completed',
        'Rejected',
        'Archived',
      ],
      default: 'New Lead',
    },
    followUpRequired: { type: Boolean, default: false },
    followUpPriority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'None'],
      default: 'None',
    },
  },
  { timestamps: true }
);

collaborationSchema.index({ status: 1, lastConversationDate: 1, followUpRequired: 1 });

module.exports = mongoose.model('Collaboration', collaborationSchema);
