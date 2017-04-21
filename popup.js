function getCurrentTabUrl(fn) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
	
	var _url = document.getElementById('_url');
	_url.hidden = false;
	_url.innerHTML = url;
  });
  
  fn(tab);
}

chrome.tabs.onUpdated
	.addListener(
	function() { 
		getCurrentTabUrl(
			function(tab) {
				  chrome.tabs.executeScript(tab.id, {code: 'alert('test');window.stop();', runAt: "document_start"});
			}
		);
	});

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
	chrome.tabs.getCurrent(
		function(tab) {
			console.log("Cat intercepted: " + info.url);
			return {redirectUrl: "https://www.yahoo.com"};
		},
		{urls: ["*"], tabId: tab.id},
		["blocking"]
	)
  }
);

