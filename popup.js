let isConnected = false;

document.getElementById('toggleConnection').addEventListener('click', function() {
  if (isConnected) {
    disconnect();
  } else {
    connect();
  }
});

function connect() {
    let selectedLocation = document.getElementById('location').value;
  
    let proxyDetails;
    switch (selectedLocation) {
      case 'us':
        proxyDetails = { host: "185.199.229.156", port: 7492 };
        break;
      case 'uk':
        proxyDetails = { host: "uk-proxy.example.com", port: 8080 };
        break;
      default:
        proxyDetails = null;
    }
  
    if (proxyDetails) {
      let config = {
        mode: "pac_script",
        pacScript: {
          data: `function FindProxyForURL(url, host) { return "PROXY ${proxyDetails.host}:${proxyDetails.port}"; }`
        }
      };
  
      chrome.proxy.settings.set({ value: config, scope: 'regular' }, function() {
        updateStatus('Connected');
      });
    }
  }
  
  function disconnect() {
    chrome.proxy.settings.clear({}, function() {
      updateStatus('Disconnected');
    });
  }
  

function updateStatus(status) {
  document.getElementById('status').innerText = status;
  isConnected = status === 'Connected';
  document.getElementById('toggleConnection').innerText = isConnected ? 'Disconnect' : 'Connect';
}

chrome.storage.local.get('proxy', function(data) {
  if (data.proxy) {
    updateStatus('Connected');
  } else {
    updateStatus('Disconnected');
  }
});
