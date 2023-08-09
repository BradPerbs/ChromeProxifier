chrome.storage.local.get('proxy', function(data) {
    if (data.proxy) {
      chrome.proxy.settings.set({
        value: {
          mode: "fixed_servers",
          rules: {
            singleProxy: {
              host: data.proxy.host,
              port: data.proxy.port
            },
            bypassList: ["localhost"]
          }
        },
        scope: 'regular'
      });
    } else {
      chrome.proxy.settings.clear({}, function() {});
    }
  });
  