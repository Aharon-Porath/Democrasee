
var resources = require('jest'),
    og_action = require('../../og/og.js').doAction,
    models = require('../../models'),
    notifications = require('../notifications'),
    common = require('../common.js'),
    async = require('async'),
    _ = require('underscore');

var PostOnSuggestionResource = module.exports = common.GamificationMongooseResource.extend({
    init:function () {
        this._super(models.PostSuggestion, null, 0);
        this.allowed_methods = ['get', 'post', 'delete'];
        this.authorization = new common.TokenAuthorization();
        this.authentication = new common.SessionAuthentication();
        this.filtering = {suggestion_id: null};
        this.default_query = function (query) {
            return query.sort({creation_date:'ascending'});
        };
        this.fields = {
            creator_id : null,
            username: null,
            avatar: null,
            text:null,
            creation_date: null,
            _id:null,
            discussion_id:null,
            suggestion_id: null,
            is_my_comment: null
        };
        this.default_limit = 50;
    },

    run_query: function(req,query,callback)
    {
        query.populate('creator_id');
        this._super(req,query,callback);
    },

    get_objects: function (req, filters, sorts, limit, offset, callback) {
        // get user's avatar for each post
        this._super(req, filters, sorts, limit, offset, function(err, results){
            if(!err) {
                _.each(results.objects, function(post){
                    post.avatar = post.creator_id.avatar_url();
                    post.username = post.creator_id.toString();
                    post.creator_id = post.creator_id.id;

                    //set is_my_comment flag
                    post.is_my_comment = req.user && (req.user.id + "" === (post.creator_id && post.creator_id + ""));
                });
            }

            callback(err, results);
        });
    },

    create_obj: function(req, fields, callback) {

        var user_id = req.user.id;
        var suggestion_creator_id = fields.suggestion_creator_id;
        var discussion_id = fields.discussion_id;
        var suggestion_id = fields.suggestion_id;
        var post_id;

        var self = this;
        var user = req.user;

        fields.creator_id = user.id;
        fields.first_name = user.first_name;
        fields.last_name = user.last_name;

        var iterator = function (unique_user, itr_cbk) {
            console.error(unique_user.email);
            if (unique_user  === req.session.user.id || !unique_user || unique_user === "undefined"){
                console.log("user should not get mail if he is the notificator");
                itr_cbk(null, 0);
            } else {
                if (suggestion_creator_id === unique_user) {
                    notifications.create_user_notification("comment_on_discussion_change_suggestion_you_created", post_id, unique_user, user_id, discussion_id, '/discussions/' + discussion_id, function (err, results) {
                        itr_cbk(err, results);
                    }, post_id);
                }
                else {
                    notifications.create_user_notification("comment_on_discussion_change_suggestion", post_id, unique_user, user_id, discussion_id, '/discussions/' + discussion_id, function (err, results) {
                        itr_cbk(err, results);
                    }, post_id);
                }
            }
        };

        self._super(req, fields, function(err, post_suggestion) {
            post_suggestion.avatar = req.user.avatar_url();
            post_suggestion.username = req.user + "";
            post_id = post_suggestion._id;

            notifications.create_user_notification("comment_on_discussion_change_suggestion_you_created", post_id,
                suggestion_creator_id, user_id, discussion_id, '/discussions/' + discussion_id, function (err, results) {
                    callback(err, post_suggestion);
            }, post_id);

            //async.waterfall([
            //    function (cbk) {
            //        models.Discussion.findById(fields.discussion_id, cbk);
            //    },
            //    function (disc_obj, cbk){
            //        // find all users that has this discussion in their discussion list (for notifications)
            //        models.User.find({'discussions.discussion_id': discussion_id}, function(err, users){
            //            cbk(err, disc_obj, users);
            //        });
            //    },
            //    //add notification for the dicussion's participants or creator
            //    function (disc_obj, users, cbk) {
            //
            //        cbk();
            //
            //        var unique_users = [];
            //
            //        // be sure that there are no duplicated users in discussion.users
            //        _.each(disc_obj.users, function (user) {
            //            unique_users.push(user.id || user.user_id + "")
            //        });
            //        _.each(users, function (user) {
            //            unique_users.push(user.id)
            //        });
            //        unique_users = _.uniq(unique_users);
            //
            //        async.forEach(unique_users, iterator, function(err){
            //            if(err){
            //                console.error(err);
            //                err.trace();
            //            }
            //        });
            //
            //    }
            //
            //]);

        });

    },

    delete_obj: function(req,object,callback){
        if (object.creator_id && (req.user.id === object.creator_id.id)){
            object.remove(function(err){
                callback(err);
            })
        }else{
            callback({err: 401, message :"user can't delete posts of others"});
        }
    }
});
