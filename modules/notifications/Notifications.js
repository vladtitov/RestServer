/**
 * Created by VladHome on 3/31/2016.
 */
!function(){

    var timer;
  // var logURL = baseUrl+(logURL || 'test/log.php');
  //  var recordURL =baseUrl +'test/acc_rej.php';
    var initNotifications = function(options){
        var graboppNotifications = new grabop.Notifications.Main(options);
        // graboppNotifications.loadData();



        var startTimer = function()
        {
            graboppNotifications.checkData(function (total) {
                $('#NotificationsTotal').text(total);
            });

            timer = setInterval(function () {
                graboppNotifications.checkData(function (total) {
                    $('#NotificationsTotal').text(total);
                });
            }, 15000);

            graboppNotifications.reset();
        }


        startTimer();
       $('#NotificationsClose').click(function(){
           startTimer();
       });



        $('#ShowQuickView').click(function(){

            if($('#quickview').hasClass('open')){
                $('#quickview').removeClass('open');
                startTimer();
            }
            else  {
                clearInterval(timer);
                $('#quickview').addClass('open');
            }

        })


    }

    var loadNotivications = function() {
        var d1 = $.Deferred();
        var d2 = $.Deferred();
        var d3 = $.Deferred();
        var d4 = $.Deferred();

        $.when(d1,d2,d3).then(function(v1,v2){
            //notificationsOptions.settings = v1;
            initNotifications(v1);
        });

        $.get(baseUrl + 'modules/notifications/notifications-template.htm').done(function(res){
            $('body').append(res);
            d3.resolve();
        })


        importScript(baseUrl + 'js/Base.js', function () {
            importScript(baseUrl + 'modules/notifications/NotificationsBase.js', function () {
                importScript(baseUrl + 'modules/notifications/NotificationsList.js', function () {
                    importScript(baseUrl + 'modules/notifications/GrabOpNotifications.js', function () {
                        d2.resolve()
                    });
                });

            });
        })


        $.get('modules/notifications/notifications-settings.json').done(function(res){
            d1.resolve(res);
        });
    }

    loadNotivications();

    /*

     var loadMessages = function() {
     importScript(baseUrl + 'modules/messages/MessagesChat.js', function () {
     console.log(arguments);
     var chat = new grabop.MessagesChat();
     chat.appendTo($('#MessagesChat'));
     chat.on(chat.CANCEL, function (btnCancel) {

     })
     chat.on(chat.SENDING, function (data) {

     });
     chat.on(chat.SENT, function (result) {

     })
     })
     }
     */

}()