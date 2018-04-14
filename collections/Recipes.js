import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
import { Mongo } from 'meteor/mongo';

Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    insert: function (userId, doc){
        // Verificando se o usuário realmente existe.
        return !!userId;
    }
});

Ingredient = new SimpleSchema({
    name:{
        type: String
    },
    amount:{
        type: String
    }
});


RecipeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },

    inMenu:{
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform:{
            type: 'hidden'
        }
    },

    desc: {
        type: String,
        label: "Descriptions"
    },
    ingredients: {
        type: Array
    },
    "ingredients.$": {
        type: Ingredient
    },
    // ingredients:{
    //     type: [Ingredient]
    // },
    // comments: {
    //     type: [Object],
    //     optional: true,
    //     maxCount: 50
    // },
    // 'comments.$.userId': {
    //     type: String
    // },
    // 'comments.$.date': {
    //     type: Date
    // },
    // 'comments.$.text': {
    //     type: String,
    //     max: 500
    // },

    author: {
        type: String,
        label: "Author",
        autoValue: function () {
            return this.userId
        },
        autoform:{
            type: 'hidden'
        }
    },

    createdAt: {
        type: Date,
        label: "Created At:",
        autoValue: function () {
            return new Date();
        },
        autoform: {
            type: 'hidden'
        }
    }
});

Recipes.attachSchema(RecipeSchema);