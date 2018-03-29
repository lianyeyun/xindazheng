// operations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
/**
 * usage of operation model:
 * 1) operation must belong to some org, and it is installed from appstore
 * so org_id and appstore_id is required 
 * 2) operation must be executed by some roles, if user's role match operation's
 * role, then user can execute(open) operation 
 * 3) by default, operation have three stage: ready, start, end and more stages can 
 * be added into stages, in stage schemas, stages must insert in correct order
 * and it is completed one by one
 * because operation is executed by user, so there are two stage, one is operation stage
 * and the other is user's stage, operation's current stage sometime is useful, for 
 * example, if set current stage of operation as ready, then all user can access and 
 * execute operation, if set end of operation then all operation is not executable 
 * for user
 * 4) each stage have start/end/expire time, when user access operation, it will use to 
 * judge whether user is allowed to execute operation, in many case, operation's current stage
 * and user's operation stage are together used to judge user's permit for execute operation, 
 * for example, if ( operation's current stage is not set as expired and before operation's expire time)
 * 5） messages is use to store messages for operation, each operation can get messages
 * if add message to operation, then all users of operation will get message, message can 
 * only send to specific user of operation
 * 6) alerts is use to add alerts for operation, each operation can create alerts
 * if add alerts in operation, the all users of operation will get alerts, alert can also
 * send to specific operation user
 * 7) concurrent is use to define how many users is allow to execute operation at same time
 * if allow one, then means only one user is allow to execute operation, current means how 
 * many users is now executing operation.
 * 8) progress is the operation's progress in percentage, user's operation has own progress
 * and operation has total progress, usually operation's progress is populated from user's operation
 * progress
 * 
 * @param {*} app 
 */
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { operationRoleSchema } = require('./common-schemas');
  const { operationStageSchema } = require('./common-schemas');
  const { operationMessageSchema } = require('./common-schemas');

  const operations = new Schema({
    name: { type: String, required: true },
    display_name: { type: String},
    org_id: { type: Schema.Types.ObjectId, required: true  },
    appstore_id: { type: Schema.Types.ObjectId, required: true  },
    active: { type: Boolean, required: true, default: true },
    roles: [ operationRoleSchema ],
    concurrent: {
      current: { type: Number },
      allow: { type: Number } //0 or negative means unlimited
    },
    stage: {
      current: { operationStageSchema },
      schemas: [ operationStageSchema ] //ready, start, end
    },
    progress: { percentage: Number, data: { type: Schema.Types.Mixed } }, //percentage value
    messages: { operationMessageSchema }, //store messages to whole operation or specific operator
    alerts: { alertSchema },
    data: { type: Schema.Types.Mixed }
  }, {
    timestamps: true
  });

  return mongooseClient.model('operations', operations);
};
