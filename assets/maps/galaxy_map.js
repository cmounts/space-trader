		        var map;
			    //var mapBounds = new OpenLayers.Bounds( 0.0, -16384.0, 16384.0, 0.0);
			    var mapMinZoom = 2;
			    var mapMaxZoom = 6;

		        // avoid pink tiles
		        OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
		        OpenLayers.Util.onImageLoadErrorColor = "transparent";

		    function init(){
	            var options = {
	                controls: [],
					//(  0.0, -16384.0, 16384.0, 0.0)
		            maxExtent: new OpenLayers.Bounds( 0.0, -16384.0, 16384.0, 0.0),
		            maxResolution: 64.000000,
		            numZoomLevels: 7,
					center: new OpenLayers.LonLat(8192, -8192),
					restrictedExtent: new OpenLayers.Bounds( 0.0, -16384.0, 16384.0, 0.0)
		            };
	            map = new OpenLayers.Map('map', options);
	
		        var layer = new OpenLayers.Layer.TMS( "TMS Layer","",
		            {  url: '', serviceVersion: '.', layername: '.', alpha: false,
						type: 'jpg', getURL: overlay_getTileURL 
					});
		        map.addLayer(layer);
				//Set active zoom to fill the screen
				var mapWidth = getWindowWidth();
				var zoomlvl = ((Math.floor(mapWidth / 256)) - 1);
				map.zoomTo(zoomlvl);
				//Set restricted Extents to limit panning
				
				//map.zoomToExtent( mapBounds );	
		
	            map.addControl(new OpenLayers.Control.PanZoomBar());
	            map.addControl(new OpenLayers.Control.MousePosition());
	            map.addControl(new OpenLayers.Control.MouseDefaults());
	            map.addControl(new OpenLayers.Control.KeyboardDefaults());
				
				map.events.register('zoomend', this, function(evt) { 
					var zl = this.map.getZoom();
					if (zl >= 3) {
						return zl = 0;			
					}					
					var size = new OpenLayers.Size((12 * zl),(12 * zl));
					ship001.setSize(size);
				});
				(loadMarkers ());

	        }
			function loadMarkers () {
				//add some test markers
				var zl = this.map.getZoom();
				var redteam = new OpenLayers.Layer.Markers( "Ships" );
				map.addLayer(redteam);
				
				var size = new OpenLayers.Size((12 * zl),(12 * zl));
				var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
				var ship001 = new OpenLayers.Icon('./img/ship_001.gif',size,offset);
				
				marker = new OpenLayers.Marker(new OpenLayers.LonLat(7140,-8808),ship001.clone());
				marker.events.register('dblclick', marker, function(evt) { window.location = './scans/Floor_00/0111/1/TruView.xml'; OpenLayers.Event.stop(evt); });
				redteam.addMarker(marker);
				
				marker = new OpenLayers.Marker(new OpenLayers.LonLat(7240,-8708),ship001.clone());
				marker.events.register('dblclick', marker, function(evt) { window.location = './scans/Floor_00/0111/1/TruView.xml'; OpenLayers.Event.stop(evt); });
				redteam.addMarker(marker);
			}
			
	        function overlay_getTileURL(bounds) {
	            var res = this.map.getResolution();
	            var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
	            var y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h));
	            var z = this.map.getZoom();
				if (x >= 0 && y >= 0) {
		            return this.url + "assets/maps/galaxy_map/" + z + "/" + x + "/" + y + "." + this.type;				
				} else {
	                return "http://www.maptiler.org/img/none.png";
				}
			}
			
		   function getWindowHeight() {
		        if (self.innerHeight) return self.innerHeight;
		        if (document.documentElement && document.documentElement.clientHeight)
		            return document.documentElement.clientHeight;
		        if (document.body) return document.body.clientHeight;
			        return 0;
		    }

		    function getWindowWidth() {
			    if (self.innerWidth) return self.innerWidth;
			    if (document.documentElement && document.documentElement.clientWidth)
			        return document.documentElement.clientWidth;
			    if (document.body) return document.body.clientWidth;
			        return 0;
		    }

		    function resize() {  
			    var map = document.getElementById("map");
				//var mapHeight = getWindowHeight();
			    //var header = document.getElementById("header");  
			    //var subheader = document.getElementById("subheader");  
			    map.style.height = (getWindowHeight() - 40) + "px";
			    map.style.width = (getWindowWidth()) + "px";
				//map.setOptions({restrictedExtent: (0, (getWindowHeight() / 2),(getWindowWidth() / 2), 0) });
			    //header.style.width = (getWindowWidth()-20) + "px";
			    //subheader.style.width = (getWindowWidth()-20) + "px";
				if (map.updateSize) { map.updateSize(); };
		    } 

		    onresize=function(){ resize(); };