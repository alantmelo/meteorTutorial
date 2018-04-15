import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
import { Mongo } from 'meteor/mongo';

Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    insert: function (userId, doc){
        // Verificando se o usuário realmente existe.
        return !!userId;
    },

    update: function(userId, doc){
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


Meteor.methods({
    toggleMenuItem: function name(id, currentState) {
        Recipes.update(id, {
            $set: {
                inMenu: !currentState
            }
        });
    }
});

Recipes.attachSchema(RecipeSchema);