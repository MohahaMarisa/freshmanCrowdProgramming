$(function(){
  var client = mqtt.connect('mqtt://marisamaxmaayan:6226622662@broker.shiftr.io', {
    clientId: 'javascript'
  });

  client.on('connect', function(){
    console.log('client has connected!');
  });

  client.on('message', function(topic, message) {
    console.log('new message:', topic, message.toString());
  });

  // $('#button').click(function(){
  //   client.publish('/hello', 'world');
  // });
  $("body").on('DOMSubtreeModified', '#angle1', function() {
    var angle1 = $('#angle1').html();
    client.publish('/head', angle1);
    // console.log('angle1 sent');
  });
  $("body").on('DOMSubtreeModified', '#angle2', function() {
    var angle2 = $('#angle2').html();
    client.publish('/body', angle2);
    // console.log('angle2 sent');
  });
  $("body").on('DOMSubtreeModified', '#angle3', function() {
    var angle3 = $('#angle3').html();
    client.publish('/rotation', angle3);
    // console.log('angle2 sent');
  });
  // $('#angle1').bind('DOMNodeInserted DOMNodeRemoved', function() {
  //   var angle1 = $( "div.angle1" ).html();
  //   client.publish(angle1);
  //   console.log('angle1 sent');
  // })
  // $('#angle2').bind('DOMNodeInserted DOMNodeRemoved', function() {
  //   var angle2 = $( "div.angle2" ).html();
  //   client.publish(angle2);
  //   console.log('angle2 sent');
  // })
})