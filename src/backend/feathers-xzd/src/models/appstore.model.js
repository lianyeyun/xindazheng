// appstore-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
/**
 * @param {*} app 
 */
const permission = require('./operationPermissions.model');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const appstore = new Schema({
    org_installer: installerSchema,//org_id and install time
    org_distributor: distributorSchema, //from which distributor
    org_creator: creatorSchema,
    org_owner: ownerSchema,
    definition: definitionSchema,
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const installerSchema = new Schema({
    org_id: Schema.Types.ObjectId,
    install_time: Date,
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const distributorSchema = new Schema({
    org_id: Schema.Types.ObjectId,
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const ownerSchema = new Schema({
    org_id: Schema.Types.ObjectId,
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const creatorSchema = new Schema({
    org_id: Schema.Types.ObjectId,
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const definitionSchema = new Schema({
    appname: { type: String, Unique: true, required: true },
    description:String,
    details: [Schema.types.Mixed],//use to save detail infomation for app, like video
    operations: [operationSchema],
    workflows: Schema.Types.Mixed,
    roles: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const operationSchema = new Schema({
    name: String, //unique in app scope
    display_name: String,
    permissions: [permission],
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const roleSchema = new Schema({
    name: String, //in each app, role name should be unique
    display_name: String,
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const workflowSchema = new Schema({
    name: String,//in each app, workflow name should be unique
    display_name: String,
    works: [workSchema],
    data: Schema.Types.Mixed
  }, {
    timestamps: true
  });

  const workSchema = new Schema({
    name: String, //in each workflow work name should be unique
    display_name: String,
    operations: [String],//operation name
    workflows: [String] //object id for workflow schema
  }, {
    timestamps: true
  });

  return mongooseClient.model('appstore', appstore);
};
