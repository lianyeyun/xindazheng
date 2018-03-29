module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
  
    const operationStageSchema = new Schema({
      name: { type: String, required: true },//ready, start, end is embed, can add more
      display_name: { type: String},
      start: { 
        time: { type: Number } //pervious time: positive before current time, forever: negative
      },
      end: {
        time: { type: Number } //pervious time: positive before current time, forever: negative
      },
      expire: {
        time: { type: Number } //pervious time: positive before current time, forever: negative
      },
      data: { type: Schema.Types.Mixed }
    }, {
      timestamps: true
    });
  
    const operationRoleSchema = new Schema({
      oid: { type: Schema.Types.ObjectId },
      name: { type: String },// usually name should with org
      org: { 
        oid: { type: Schema.Types.ObjectId },
        name: { type: String }
       },
      include: {
        roles: [ roleSchema ],//other roles objectId
        recursive_roles: [ roleSchema ],
        children: { type: String, enum: ['recursive','true','false'] },
        parent: { type: String, enum: ['recursive','true','false'] },
      },
      exclude: {
        roles: [ roleSchema ],
        recursive_roles: [ roleSchema ],
        children: { type: String, enum: ['recursive','true','false'] },
        parent: { type: String, enum: ['recursive','true','false'] },
      },
      data: { type: Schema.Types.Mixed }
    }, {
      timestamps: true
    });

    const operationMessageSchema = new Schema({
      name: { type: String },// usually name should with org
      title: { type: String },
      description: { type: String },
      content: [ { type: Schema.Types.Mixed } ],
      status: { type: String, enum: ['sended', 'saved', 'received']},
      to: {
        operations: [
          { 
            oid: { type: Schema.Types.ObjectId },
            filters: [{ type: Schema.Types.Mixed }], //filter to operators of operation
            data: { type: Schema.Types.Mixed }
          }
        ], // send all operation
        operators: [
          { 
            oid: { type: Schema.Types.ObjectId },
            data: { type: Schema.Types.Mixed }
          }
        ]
      },
      from: {
        operator: {
          oid: { type: Schema.Types.ObjectId },
          data: { type: Schema.Types.Mixed }
        }
      }
    }, {
      timestamps: true
    });

    const operationAlertSchema = new Schema({
      name: { type: String },// usually name should with org
      title: { type: String },
      description: { type: String },
      content: [ { type: Schema.Types.Mixed } ],
      to: {
        operations: [
          { 
            oid: { type: Schema.Types.ObjectId },
            filters: [{ type: Schema.Types.Mixed }], //filter to operators of operation
            data: { type: Schema.Types.Mixed }
          }
        ], // send all operation operators
        operators: [
          { 
            oid: { type: Schema.Types.ObjectId },
            data: { type: Schema.Types.Mixed }
          }
        ]
      },
      from: {
        operator: {
          oid: { type: Schema.Types.ObjectId },
          data: { type: Schema.Types.Mixed }
        }
      },
      urgent: {},
      expire: {}
    }, {
      timestamps: true
    });
  
    return {
        operationStageSchema,operationRoleSchema,operationMessageSchema
    }
  };