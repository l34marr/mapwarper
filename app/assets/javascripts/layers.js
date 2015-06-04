

//function used with osm mapnik tiles
function osm_getTileURL(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "/" + x + "/" + y + "." + this.type;
    }
}
//use with
function get_tilesathome_osm_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit)
    {
        return null;
    }
    else
    {
        x = ((x % limit) + limit) % limit;
        var path = z + "/" + x + "/" + y + "." + this.type;
        var url = this.url;
        url="http://tah.openstreetmap.org/Tiles/tile/"
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
        return url + path;
    }
}

//from yychen
function get_smg_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        z = 17 - z;
        return this.url + z + "/" + x + "/IMG_" + x + "_" + y + "_" + z + "." + this.type;
    }
}

//from yychen
function get_tgm_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + '&TileMatrix=' + z + '&TileCol=' + x + '&TileRow=' + y;
    }
}

//from yychen
function get_som_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "&TILECOL=" + x + "&TILEROW=" + y + "&FORMAT=image%2F" + this.type;
    }
}

//from yychen
function get_jinjian_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "&TILECOL=" + x + "&TILEROW=" + y + "&FORMAT=image%2Fjpeg";
    }
}

//from marr
function get_tdt_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "&TileRow=" + y + "&TileCol=" + x;
    }
}

var osma = new OpenLayers.Layer.TMS(
    "Osmarender",
    ["http://a.tah.openstreetmap.org/Tiles/tile/", "http://b.tah.openstreetmap.org/Tiles/tile/", "http://c.tah.openstreetmap.org/Tiles/tile/"],
    {
        type:'png',
        getURL: get_tilesathome_osm_url,
        displayOutsideMaxExtent: true
    }, {
        'buffer':1
    } );

var mapnik = new OpenLayers.Layer.TMS("OSM Mapnik", "http://tile.openstreetmap.org/", {
    type: 'png',
    getURL: osm_getTileURL,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
    attribution: '&copy <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors'
});


var jpl_wms = new OpenLayers.Layer.WMS("NASA Landsat 7", "http://t1.hypercube.telascience.org/cgi-bin/landsat7", {
    layers: "landsat7"
});

var oamlayer = new OpenLayers.Layer.WMS( "OpenAerialMap",
   "http://openaerialmap.org/wms/",
   {layers: "world"}, { gutter: 15, buffer:0});

if(typeof(G_SATELLITE_MAP) !== 'undefined'){
  var googleSat = new OpenLayers.Layer.Google( "Google Satellite", {type: G_SATELLITE_MAP, 'sphericalMercator': true});
  var googleMaps = new OpenLayers.Layer.Google( "Google Map", { 'sphericalMercator': true});
  var googleHybrid = new OpenLayers.Layer.Google("Google Hybrid", {type: G_HYBRID_MAP, 'sphericalMercator': true});
}

var sgmlayer = new OpenLayers.Layer.TMS("台灣堡圖", "http://gis.sinica.edu.tw/googlemap/JM20K_1904/", {
    type: 'jpg',
    getURL: get_smg_url,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
});

var tgmlayer = new OpenLayers.Layer.TMS("通用版電子地圖", "http://maps.nlsc.gov.tw/S_Maps/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&FORMAT=image/png&STYLE=_null&LAYER=EMAP&TILEMATRIXSET=EPSG:3857", {
    type: 'png',
    getURL: get_tgm_url,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
});

var tdtlayer = new OpenLayers.Layer.TMS("天地圖電子地圖", "http://t0.tianditu.com/vec_w/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&format=&TileMatrixSet=w&TileMatrix=", {
    type: 'png',
    getURL: get_tdt_url,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
});

var somlayer = new OpenLayers.Layer.TMS("正射影像", "http://maps.nlsc.gov.tw/S_Maps/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=PHOTO2&STYLE=_null&TILEMATRIXSET=EPSG%3A3857&TILEMATRIX=EPSG%3A3857%3A", {
    type: 'png',
    getURL: get_som_url,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
});

var jinjianlayer = new OpenLayers.Layer.TMS("經建版地形圖", "http://gis.sinica.edu.tw/tileserver/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=TM25K_2001&STYLE=_null&TILEMATRIXSET=GoogleMapsCompatible&TILEMATRIX=", {
    type: 'jpg',
    getURL: get_jinjian_url,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
});
