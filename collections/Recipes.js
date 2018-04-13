import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Recipes = new Mongo.Collection('recipes');

Recipes.allow({
    insert: function (userId, doc){
        // Verificando se o usuário realmente existe.
        return !!userId;
    }
});

RecipeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },

    desc: {
        type: String,
        label: "Descriptions"
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

Recipes.attachSchema(RecipeSchema);