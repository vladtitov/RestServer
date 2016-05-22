/**
 * Created by VladHome on 2/5/2016.
 */
///<reference path="../../js/typings/jquery.d.ts"/>
///<reference path="../../js/typings/underscore.d.ts"/>
///<reference path="GrabOpNotifications.ts"/>
///<reference path="NotificationsList.ts"/>

module grabop.Notifications {

    export class BaseNote {
        static BID:string = 'bid';
        static ALLIANCE:string = 'alliance';
        static MESSAGE:string = 'message';
        static TASK:string = 'task';
        static CONNECTIONS:string = 'connections';
        static SERVICE:string = 'service';


        constructor(obj:any) {
            for (var str in obj)this[str] = obj[str];
        }

        id:number;
        type:string;
        notifieduser:number;
        notifier:number;
        message:string;
        date:string;
        notified:boolean;
        read:boolean;
        action:string;
        view:JQuery;

    }

    export class AllianceNote extends BaseNote {
        domain:string; //{join, rejected, deleted, invite, request, project}
        serviceid:number
        title:string
        summary:string
        allianceid:number
        displaymembers:boolean
        isfull:boolean;
        createdat:string;

        constructor(obj:any) {
            super(obj);
        }

    }

    export class TaskNote extends BaseNote {
        taskid:number;
        name:string;
        domain:string;// { join, deleted, invite, request }
        constructor(obj) {
            super(obj);
        }

    }
    export class MessageNote extends BaseNote {
        messageid:number;
        body:string;
        subject:string;
        created:string;
        from:string;
        messageType:string;
        more:string;

        constructor(obj) {
            super(obj);
        }
    }

    export class ConnectionsNote extends BaseNote {
        connectionid:number;
        displayname:string;
        profile_pic:string;
        domain:string;// {trusted ,  connect,  confirmed}
        constructor(obj) {
            super(obj);
        }

    }

    export class ServiceNote extends BaseNote {
        serviceid:number;
        title:string;
        summary:string;
        rate:string;

        constructor(obj) {
            super(obj);
        }

    }

    export class BidNote extends BaseNote {
        bidid:number;
        bidderid:number;
        serviceid:number;
        bidtype:string;
        biddate:string;
        status:string;
        statusDate:string;
        bidmessage:string;
        paymentType:string;

        constructor(obj) {
            super(obj);
        }

    }

}