class PdvModel {
  constructor(database) {
    const schemaOptions = {
      collection: 'pdvs',
      versionKey: false,
      timestamps: true,
    };

    const multiPolygonSchema = {
      type: {
        type: String,
        enum: ['MultiPolygon'],
        required: true,
      },
      coordinates: {
        type: [[[[Number]]]],
        required: true,
      },
    };

    const pointSchema = {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    };

    const PdvSchema = new database.Schema(
      {
        id: {
          type: Number,
          required: true,
          unique: true,
        },
        tradingName: {
          type: String,
          required: true,
        },
        ownerName: {
          type: String,
          required: true,
        },
        document: {
          type: String,
          required: true,
          unique: true,
        },
        coverageArea: multiPolygonSchema,
        address: pointSchema,
      },
      schemaOptions,
    );

    PdvSchema.index({ address: '2dsphere' });

    this.PdvModel = database.model('Pdv', PdvSchema);
  }

  create() {
    return this.PdvModel;
  }
}

module.exports = PdvModel;
