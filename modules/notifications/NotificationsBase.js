/**
 * Created by VladHome on 2/5/2016.
 */
///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>
///<reference path="GrabOpNotifications.ts"/>
///<reference path="NotificationsList.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var grabop;
(function (grabop) {
    var Notifications;
    (function (Notifications) {
        var BaseNote = (function () {
            function BaseNote(obj) {
                for (var str in obj)
                    this[str] = obj[str];
            }
            BaseNote.BID = 'bid';
            BaseNote.ALLIANCE = 'alliance';
            BaseNote.MESSAGE = 'message';
            BaseNote.TASK = 'task';
            BaseNote.CONNECTIONS = 'connections';
            BaseNote.SERVICE = 'service';
            return BaseNote;
        })();
        Notifications.BaseNote = BaseNote;
        var AllianceNote = (function (_super) {
            __extends(AllianceNote, _super);
            function AllianceNote(obj) {
                _super.call(this, obj);
            }
            return AllianceNote;
        })(BaseNote);
        Notifications.AllianceNote = AllianceNote;
        var TaskNote = (function (_super) {
            __extends(TaskNote, _super);
            function TaskNote(obj) {
                _super.call(this, obj);
            }
            return TaskNote;
        })(BaseNote);
        Notifications.TaskNote = TaskNote;
        var MessageNote = (function (_super) {
            __extends(MessageNote, _super);
            function MessageNote(obj) {
                _super.call(this, obj);
            }
            return MessageNote;
        })(BaseNote);
        Notifications.MessageNote = MessageNote;
        var ConnectionsNote = (function (_super) {
            __extends(ConnectionsNote, _super);
            function ConnectionsNote(obj) {
                _super.call(this, obj);
            }
            return ConnectionsNote;
        })(BaseNote);
        Notifications.ConnectionsNote = ConnectionsNote;
        var ServiceNote = (function (_super) {
            __extends(ServiceNote, _super);
            function ServiceNote(obj) {
                _super.call(this, obj);
            }
            return ServiceNote;
        })(BaseNote);
        Notifications.ServiceNote = ServiceNote;
        var BidNote = (function (_super) {
            __extends(BidNote, _super);
            function BidNote(obj) {
                _super.call(this, obj);
            }
            return BidNote;
        })(BaseNote);
        Notifications.BidNote = BidNote;
    })(Notifications = grabop.Notifications || (grabop.Notifications = {}));
})(grabop || (grabop = {}));
//# sourceMappingURL=NotificationsBase.js.map