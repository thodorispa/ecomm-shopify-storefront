import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  lines: {
    type: Array,
    // PRODUCT
    product: {
      id: {
        type: String
      },
      title: {
        type: String
      },
      publishedAt: {
        type: String
      },

      // IMAGES
      images: {
        src: {
          type: String
        },
        altText: {
          type: String
        }
      },

      // VARIANTS
      variants: {
        id: {
          type: String
        },
        quantityAvailable: {
          type: Number
        },
        priceV2: {
          amount: {
            type: Number
          },
          currencyCode: {
            type: String
          }
        }
      }
    },
    quantity: {
      type: Number
    }
  },
  cost: {
    totalAmount: {
      amount: {
        type: Number
      },
      currencyCode: {
        type: String
      }
    },
    subtotalAmount: {
      amount: {
        type: Number
      },
      currencyCode: {
        type: String
      }
    },
    totalTaxAmount: {
      amount: {
        type: Number
      },
      currencyCode: {
        type: String
      }
    },
    totalDutyAmount: {
      amount: {
        type: Number
      },
      currencyCode: {
        type: String
      }
    }
  },
  createdAt: {
    type: Number,
  }, 
  updatedAt: {
    type: Number,
  }

});

export default mongoose.model('cart', cartSchema);