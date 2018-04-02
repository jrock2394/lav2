$(document).ready(function () {
    
    $('.spinner').hide().ajaxStart( function() {
        $(this).show();  // show Loading Div
            } ).ajaxStop ( function(){
                $(this).hide(); // hide loading div
    });

    $.ajax({
        type: "GET",
        url: "https://launchlibrary.net/1.3/launch/next/1?status=1&tbdtime=0",
        dataType: "json",
        
        success: function(data) {
            /* console.log(data) */
            
            var date = new Date(data.launches[0].windowstart);
            var date2 = new Date(data.launches[0].windowend);
            
            $(".tMinus").countdown(date, function(event) {
               var tminus = $(this).text(event.strftime( 'T- ' + '%D:%H:%M:%S')
                );
            });
            
            $("#appbox").find(".launchName").append(data.launches[0].name);
            
            $("#appbox").find(".launchTime").append(date.toLocaleString());
            
            if (data.launches[0].vidURLs.length > 0){   
                $("#appbox").find(".launchStream").append('<a target="_blank" href=" ' + data.launches[0].vidURLs[0] + '">' + 'Watch Live' + '</a>');
                }
            else{   
                    $("#appbox").find(".launchStream").append('Live Stream Not Available');
                }
            
            $("#appbox").find(".launchLSP").append('<a target="_blank" href=" ' + data.launches[0].lsp.wikiURL + '">' + data.launches[0].lsp.name + '&nbsp;' + '(' + data.launches[0].lsp.abbrev + ')' + '</a>');
            
            $("#appbox").find(".launchMission").prepend(data.launches[0].missions[0].name);
            
            $("#appbox").find(".launchDescription").append(data.launches[0].missions[0].description);
            
            
            $("#appbox").find(".launchWStart").append('<span>Window Open:</span>' + '<br />' + date.toLocaleString());
            $("#appbox").find(".launchWClose").append('<span>Window Close:</span>' + '<br />' + date2.toLocaleString());
            $("#appbox").find(".launchType").append('<span>Mission Type:</span>' + '<br />' + data.launches[0].missions[0].typeName);
            $("#appbox").find(".launchPad").append('<span>Launch Pad:</span>' + '<br />' + data.launches[0].location.pads[0].name);
            
            $("#appbox").find(".launchProvider").append(data.launches[0].lsp.name);

        }
    });
    

 
    });



$('.toggle').click(function(e) {
  	e.preventDefault();
  
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
});