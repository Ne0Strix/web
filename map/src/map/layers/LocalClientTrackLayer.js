import React, {useContext, useEffect, useState} from "react";
import AppContext from "../../context/AppContext";
import {useMap} from "react-leaflet";
import L from "leaflet";
import TrackLayerProvider from "../TrackLayerProvider";
import TracksManager from "../../context/TracksManager";
import MarkerOptions from "../markers/MarkerOptions";
import _ from "lodash";
import EditablePolyline from "../EditablePolyline";
import EditableMarker from "../EditableMarker";
import Utils from "../../util/Utils";


export default function LocalClientTrackLayer() {
    const ctx = useContext(AppContext);
    const map = useMap();

    const [localLayers, setLocalLayers] = useState({});
    const [selectedPointMarker, setSelectedPointMarker] = useState(null);
    const [addEleTab, setAddEleTab] = useState(false);

    useEffect(() => {
        if (ctx.selectedGpxFile) {
            checkDeleteSelected();
            if (ctx.createTrack?.enable && ctx.selectedGpxFile?.points) {
                saveLocal();
            }
            checkZoom();
            checkClickOnMapEvent();
            checkUpdateLayers();
        }
    }, [ctx.selectedGpxFile]);

    useEffect(() => {
        for (let l in localLayers) {
            localLayers[l].active = false;
        }
        Object.values(ctx.localTracks).forEach((track) => {
            let currLayer = localLayers[track.name]
            if (track.selected && !currLayer) {
                addTrackToMap(track, true, true);
            } else if (currLayer) {
                currLayer.active = track.selected;
                if (track.updated) {
                    updateTrackOnMap(track, currLayer.active);
                }
            }
        });

        for (let l in localLayers) {
            if (!localLayers[l].active) {
                if (selectedPointMarker && selectedPointMarker.trackName === l) {
                    map.removeLayer(selectedPointMarker.marker);
                }
                map.removeLayer(localLayers[l].layer);
                if (l === ctx.selectedGpxFile.name) {
                    map.removeLayer(ctx.selectedGpxFile.layers);
                    ctx.setSelectedGpxFile({});
                }
                delete localLayers[l];
            }
        }

        setLocalLayers({...localLayers});
    }, [ctx.localTracks, ctx.setLocalTracks]);


    useEffect(() => {
        if (ctx.createTrack?.closePrev && !_.isEmpty(ctx.createTrack.closePrev.file)) {
            clearCreateLayers(ctx.createTrack.closePrev.file.layers);
            saveResult(ctx.createTrack.closePrev.file, true);
            delete ctx.createTrack.closePrev;
            delete ctx.createTrack.layers;
        }
        if (ctx.createTrack?.enable && !ctx.createTrack?.layers) {
            if (ctx.createTrack.edit) {
                editCurrentTrack();
            } else {
                deleteOldLayers();
                let type = ctx.OBJECT_TYPE_LOCAL_CLIENT_TRACK;
                ctx.setCurrentObjectType(type);
                initNewTrack();
            }
            addClickOnMap();
        } else if (ctx.createTrack?.enable === false) {
            if (ctx.createTrack.clear) {
                clearCreateLayers(ctx.selectedGpxFile.layers);
            } else {
                clearCreateLayers(ctx.createTrack.layers);
            }
            let savedFile;
            if (ctx.createTrack.deletePrev && ctx.selectedGpxFile.prevState) {
                savedFile = ctx.selectedGpxFile.prevState;
            } else {
                savedFile = ctx.selectedGpxFile;
            }
            saveResult(savedFile, false);
            ctx.setCreateTrack(null);
            deleteClickOnMap();
        }
    }, [ctx.createTrack])

    function saveResult(file, closePrev) {
        let ind = ctx.localTracks.findIndex(t => t.name === file.name);
        if (ind !== -1) {
            ctx.localTracks[ind] = file;
            ctx.localTracks[ind].index = ind;
            if (ctx.createTrack.clear) {
                ctx.localTracks[ind].selected = false;
                ctx.setSelectedGpxFile({});
            } else {
                if (ctx.createTrack.edit || closePrev) {
                    ctx.localTracks[ind].updated = true;
                } else {
                    ctx.localTracks[ind].selected = true;
                }
            }
            TracksManager.saveTracks(ctx.localTracks, ctx);
            ctx.setLocalTracks([...ctx.localTracks]);
        }
    }

    function clearCreateLayers(layers) {
        if (layers) {
            map.removeLayer(layers);
        }
    }

    function checkDeleteSelected() {
        if (ctx.selectedGpxFile.clear) {
            deleteOldLayers();
            ctx.setSelectedGpxFile({});
        }
    }

    function checkClickOnMapEvent() {
        if (ctx.selectedGpxFile.addPoint && !ctx.selectedGpxFile.addWpt) {
            getNewRoute().then();
        } else {
            checkDragPoint();
        }
    }

    function saveLocal() {
        if (!ctx.selectedGpxFile.addPoint) {
            if (ctx.selectedGpxFile?.analysis?.hasElevationData && !addEleTab) {
                ctx.setUpdateContextMenu(true);
                setAddEleTab(true);
            }
            if (ctx.localTracks.length > 0) {
                TracksManager.saveTracks(ctx.localTracks, ctx);
            }
        }
    }

    function checkZoom() {
        if (ctx.selectedGpxFile.selected && ctx.selectedGpxFile.zoom) {
            showSelectedTrackOnMap();
        } else if (ctx.selectedGpxFile.showPoint) {
            showSelectedPointOnMap();
        }
    }

    function addTrackToMap(track, fitBounds, active) {
        if (track.points) {
            track.tracks = [{points: track.points}];
        }
        let layer = TrackLayerProvider.createLayersByTrackData(track);
        if (layer) {
            if (fitBounds) {
                if (!_.isEmpty(layer.getBounds())) {
                    map.fitBounds(layer.getBounds());
                }
            }
            layer.on('click', (e) => {
                if (!ctx.createTrack || !ctx.createTrack.enable) {
                    ctx.setCreateTrack({
                        enable: true,
                        edit: true
                    })
                    ctx.setSelectedGpxFile(track);
                    let type = ctx.OBJECT_TYPE_LOCAL_CLIENT_TRACK;
                    ctx.setCurrentObjectType(type);
                    ctx.setUpdateContextMenu(true);
                }
            });
            layer.addTo(map);
            localLayers[track.name] = {
                layer: layer,
                points: track.points ? track.points : TracksManager.getEditablePoints(track),
                active: active
            };
            setLocalLayers({...localLayers});
        }
    }

    function createPointMarkerOnMap() {
        return new L.marker({
            lng: ctx.selectedGpxFile.showPoint.lng,
            lat: ctx.selectedGpxFile.showPoint.lat
        }, {
            icon: MarkerOptions.options.pointerIcons
        }).addTo(map);
    }

    function showSelectedTrackOnMap() {
        let currLayer = localLayers[ctx.selectedGpxFile.name];
        if (currLayer) {
            map.fitBounds(currLayer.layer.getBounds());
        }
    }

    function showSelectedPointOnMap() {
        if (ctx.selectedGpxFile.showPoint) {
            map.setView([ctx.selectedGpxFile.showPoint.layer._latlng.lat, ctx.selectedGpxFile.showPoint.layer._latlng.lng], 17);
        } else {
            if (selectedPointMarker) {
                map.removeLayer(selectedPointMarker.marker);
            }
            let marker = createPointMarkerOnMap();
            setSelectedPointMarker({marker: marker, trackName: ctx.selectedGpxFile.name});
        }
    }

    function checkDragPoint() {
        if (ctx.selectedGpxFile?.dragPoint) {
            deleteClickOnMap();
        } else {
            if (ctx.createTrack?.enable) {
                addClickOnMap();
            }
        }
    }

    function checkUpdateLayers() {
        if (ctx.selectedGpxFile?.updateLayers) {
            ctx.selectedGpxFile.updateLayers = false;
            if (!ctx.selectedGpxFile.layers) {
                ctx.selectedGpxFile.layers = new L.FeatureGroup();
            }
            ctx.selectedGpxFile.layers = updateLayers(ctx.selectedGpxFile.points, ctx.selectedGpxFile.wpts, ctx.selectedGpxFile.layers, true);
            saveChanges(ctx.selectedGpxFile.points, ctx.selectedGpxFile.wpts, ctx.selectedGpxFile.layers);
        }
    }

    function updateTrackOnMap(track, active) {
        map.removeLayer(localLayers[track.name].layer);
        track.layers?.getLayers().forEach(l => {
            map.removeLayer(l);
        })
        delete localLayers[track.name];
        addTrackToMap(track, false, active);
    }

    async function getNewRoute() {
        ctx.setPointContextMenu({})
        let file = ctx.selectedGpxFile;
        let prevPoint = file.prevPoint;
        let newPoint = file.newPoint;
        let points = file.points;
        let layers = file.layers;
        file.addPoint = false;
        if (prevPoint) {
            deleteClickOnMap();
            points = getProfile(newPoint, prevPoint, points);
            createPointOnMap(newPoint, layers);
            let polylineTemp = createTempLine(prevPoint, newPoint);
            if (newPoint.profile === TracksManager.PROFILE_LINE) {
                createNewRouteLine(prevPoint, newPoint, points, polylineTemp, layers);
            } else {
                await createNewRouteWithRouting(prevPoint, newPoint, points, polylineTemp, layers).then();
            }
        } else if (points.length === 0) {
            addFirstPoint(newPoint, file, points);
            ctx.setUpdateContextMenu(true);
        }
    }

    async function createNewRouteWithRouting(prevPoint, newPoint, points, polylineTemp, layers) {
        ctx.setGpxLoading(true);
        await TracksManager.updateRouteBetweenPoints(ctx, prevPoint, newPoint).then(res => {
            ctx.setGpxLoading(false);
            newPoint.geometry = res;
            map.removeLayer(polylineTemp);
            if (!newPoint.geometry) {
                delete prevPoint.geometry;
                points.pop();
                points.push(prevPoint);
            } else {
                let polyline = new EditablePolyline(map, ctx, newPoint.geometry, null).create();
                polyline.setStyle({
                    color: ctx.creatingRouteMode.colors[ctx.creatingRouteMode.mode]
                });
                layers.addLayer(polyline);
            }
            if (trackWithoutRouting(points)) {
                points = addGeometryToTrack(prevPoint, newPoint, points);
                updateLayers(points, null, layers, true);
            } else {
                points.push(newPoint);
            }
            if (points.length > 0) {
                let oldState = _.cloneDeep(ctx.selectedGpxFile);
                TracksManager.getTrackWithAnalysis(TracksManager.GET_ANALYSIS, ctx, ctx.setLoadingContextMenu, points).then(res => {
                    if (oldState.analysis?.hasElevationData !== res.analysis?.hasElevationData) {
                        ctx.setUpdateContextMenu(true);
                    }
                    saveChanges(null, null, null, res);
                    ctx.trackState.update = true;
                    ctx.setTrackState({...ctx.trackState});
                    addClickOnMap();
                });
            }
        });
    }

    function createNewRouteLine(prevPoint, newPoint, points, polylineTemp, layers) {
        let polylines = TrackLayerProvider.getPolylines(layers.getLayers());
        let currentPolyline = polylines.find(p => {
            let lastPoint = p._latlngs[p._latlngs.length - 1];
            if (lastPoint.lat === prevPoint.lat || lastPoint.lng === prevPoint.lng) {
                return p;
            }
        })
        if (trackHasRouting()) {
            newPoint.geometry = Utils.getPointsDist([{
                lat: prevPoint.lat,
                lng: prevPoint.lng
            }, {lat: newPoint.lat, lng: newPoint.lng}]);
            let polyline = new EditablePolyline(map, ctx, [prevPoint, {
                lat: newPoint.lat,
                lng: newPoint.lng
            }], null).create();
            polyline.setStyle({
                color: ctx.creatingRouteMode.colors[ctx.creatingRouteMode.mode]
            })
            layers.addLayer(polyline);
        } else {
            delete newPoint.geometry;
            if (prevPoint.geometry?.length === 0) {
                delete prevPoint.geometry;
            }
            if (currentPolyline) {
                currentPolyline._latlngs.push(newPoint)
                currentPolyline.setLatLngs(currentPolyline._latlngs);
            } else {
                let polyline = new EditablePolyline(map, ctx, [prevPoint, {
                    lat: newPoint.lat,
                    lng: newPoint.lng
                }], null).create();
                polyline.setStyle({
                    color: ctx.creatingRouteMode.colors[ctx.creatingRouteMode.mode]
                })
                layers.addLayer(polyline);
            }
        }
        points.push(newPoint);
        map.removeLayer(polylineTemp);
        addClickOnMap();
        TracksManager.getTrackWithAnalysis(TracksManager.GET_ANALYSIS, ctx, ctx.setLoadingContextMenu, points).then(res => {
            saveChanges(null, null, null, res);
        });
    }

    function trackWithoutRouting(points) {
        let prevProfilePoint = points.length - 2 > 0 ? points[points.length - 2] : null;
        let prevProfile = prevProfilePoint?.profile;
        return prevProfilePoint && (!prevProfile || (prevProfile === TracksManager.PROFILE_LINE && !prevProfilePoint.geometry));
    }

    function addGeometryToTrack(prevPoint, newPoint, points) {
        prevPoint.geometry = deleteInfo(_.cloneDeep(points));
        prevPoint.profile = newPoint.profile;
        let firstP = points[0];
        firstP.geometry = [];
        firstP.profile = TracksManager.PROFILE_LINE;
        return [firstP, prevPoint, newPoint];
    }

    function createTempLine(prevPoint, newPoint) {
        let polylineTemp = TrackLayerProvider.createTempPolyline(prevPoint, newPoint);
        polylineTemp.addTo(map);
        return polylineTemp;
    }

    function createPointOnMap(newPoint, layers) {
        let marker = new EditableMarker(map, ctx, newPoint, null).create();
        layers.addLayer(marker);
    }

    function addFirstPoint(newPoint, file, points) {
        points.push(newPoint);
        createFirstLayers(newPoint);
        let ind = ctx.localTracks.findIndex(t => t.name === file.name);
        if (ind === -1) {
            createLocalTrack(file, points);
        }
    }

    function createLocalTrack(file, points) {
        TracksManager.prepareTrack(file);
        file.tracks = [{points: points}];
        file.layers = TrackLayerProvider.createLayersByTrackData(file);
        file.index = ctx.localTracks.length;
        ctx.localTracks.push(file);

        ctx.setLocalTracks([...ctx.localTracks]);
    }

    function createFirstLayers(newPoint) {
        let marker = new EditableMarker(map, ctx, newPoint, null).create();
        ctx.selectedGpxFile.layers = new L.FeatureGroup().addLayer(marker);
        ctx.selectedGpxFile.layers.addTo(map);
        ctx.setSelectedGpxFile({...ctx.selectedGpxFile});

        saveCreatedLayers(marker);
    }

    function deleteInfo(points) {
        points.forEach(p => {
            delete p.profile;
            delete p.geometry
        })
        return points;
    }

    function trackHasRouting() {
        let pointWithRouting = ctx.selectedGpxFile.points.find(p =>
            p.profile !== undefined && p.profile !== TracksManager.PROFILE_LINE
        )
        return !!pointWithRouting;
    }

    function saveChanges(points, wpts, layers, res) {
        if (res) {
            ctx.selectedGpxFile = res;
        } else {
            ctx.selectedGpxFile.points = points;
            ctx.selectedGpxFile.wpts = wpts;
            ctx.selectedGpxFile.layers = layers;
        }
        TracksManager.addDistance(ctx.selectedGpxFile);
        if (ctx.selectedGpxFile.points) {
            TracksManager.addDistanceToPoints(ctx.selectedGpxFile.points)
        }
        saveCreatedLayers(ctx.selectedGpxFile.layers);
        ctx.selectedGpxFile.zoom = false;
        ctx.setSelectedGpxFile({...ctx.selectedGpxFile});
    }

    function saveCreatedLayers(layers) {
        if (ctx.createTrack) {
            ctx.createTrack.layers = _.cloneDeep(layers);
        }
    }

    function updateLayers(points, wpts, trackLayers, deleteOld) {
        if (trackLayers) {
            let layers = [];
            if (points?.length > 0) {
                TrackLayerProvider.parsePoints(points, layers, true, ctx);
            }
            if (wpts?.length > 0) {
                TrackLayerProvider.parseWpt(wpts, layers);
            }
            layers = createEditableLayers(layers);
            if (deleteOld) {
                trackLayers.getLayers().forEach(l => {
                    map.removeLayer(l)
                })
                trackLayers = new L.FeatureGroup();
            }
            layers.forEach(layer => {
                trackLayers.addLayer(layer);
            })
            if (deleteOld) {
                trackLayers.addTo(map);
            }
            return trackLayers;
        }
    }

    function createEditableLayers(layers) {
        let res = [];
        layers.forEach(layer => {
            if (layer instanceof L.Marker) {
                let editableMarker = new EditableMarker(map, ctx, null, layer).create();
                res.push(editableMarker);
            } else if (layer instanceof L.Polyline) {
                let editablePolyline = new EditablePolyline(map, ctx, null, layer).create();
                res.push(editablePolyline);
            }
        })
        return res;
    }

    function getProfile(newPoint, prevPoint, points) {
        newPoint.profile = ctx.creatingRouteMode.mode;
        if (newPoint.profile !== prevPoint.profile) {
            prevPoint.profile = newPoint.profile;
            points.pop();
            points.push(prevPoint);
        }
        return points;
    }

    function addClickOnMap() {
        if (ctx.selectedGpxFile?.dragPoint === false) {
            delete ctx.selectedGpxFile?.dragPoint;
            ctx.setSelectedGpxFile({...ctx.selectedGpxFile});
        } else if (ctx.selectedGpxFile?.dragPoint === undefined) {
            ctx.trackState.block = false;
            map.getContainer().style.cursor = 'crosshair';
            map.on("click", clickMap);
        }
    }

    function deleteClickOnMap() {
        ctx.trackState.block = true;
        map.getContainer().style.cursor = '';
        map.off('click');
    }

    function clickMap(e) {
        if (ctx.selectedGpxFile?.addWpt) {
            ctx.addFavorite.location = e.latlng;
            ctx.addFavorite.editTrack = true;
            ctx.setAddFavorite({...ctx.addFavorite});
            delete ctx.selectedGpxFile.addWpt;
        } else {
            ctx.selectedGpxFile.addPoint = true;
            let newPoint = {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
                ele: TracksManager.NAN_MARKER,
                profile: ctx.creatingRouteMode.mode,
                geometry: []
            };
            if (newPoint.profile !== TracksManager.PROFILE_LINE) {
                newPoint.geometry = [];
            }

            if (ctx.selectedGpxFile.newPoint && ctx.selectedGpxFile.points?.length > 0) {
                let points = ctx.selectedGpxFile.points;
                ctx.selectedGpxFile.prevPoint = points[points.length - 1];
                if (!ctx.selectedGpxFile.prevPoint.profile) {
                    ctx.selectedGpxFile.prevPoint.profile = TracksManager.PROFILE_LINE
                }
            }
            ctx.selectedGpxFile.newPoint = newPoint;
        }
        ctx.setSelectedGpxFile({...ctx.selectedGpxFile});
    }

    function initNewTrack() {
        ctx.selectedGpxFile = {};
        ctx.selectedGpxFile.name = TracksManager.createName(ctx);
        ctx.selectedGpxFile.tracks = TracksManager.createGpxTracks();
        ctx.selectedGpxFile.pointsGroups = {};
        ctx.selectedGpxFile.points = [];
        if (ctx.createTrack.latlng) {
            createPointFromMap();
        }
        ctx.setSelectedGpxFile({...ctx.selectedGpxFile});
    }

    function createPointFromMap() {
        let newPoint = {
            lat: ctx.createTrack.latlng.lat,
            lng: ctx.createTrack.latlng.lng,
            ele: TracksManager.NAN_MARKER,
            profile: ctx.creatingRouteMode.mode,
            geometry: []
        };
        if (newPoint.profile !== TracksManager.PROFILE_LINE) {
            newPoint.geometry = [];
        }
        ctx.selectedGpxFile.newPoint = newPoint;
        ctx.selectedGpxFile.points.push(newPoint);
        createLocalTrack(ctx.selectedGpxFile, ctx.selectedGpxFile.points);
        ctx.selectedGpxFile.updateLayers = true;
        ctx.selectedGpxFile.addPoint = true;
        ctx.trackState.update = true;
        ctx.setTrackState({...ctx.trackState});
    }

    function editCurrentTrack() {
        if (localLayers[ctx.selectedGpxFile.name]) {
            map.removeLayer(localLayers[ctx.selectedGpxFile.name]?.layer);
        }
        deleteOldLayers();

        let currentTrack = ctx.localTracks.find(t => t.name === ctx.selectedGpxFile.name);
        if (currentTrack) {
            ctx.selectedGpxFile = currentTrack;
        }
        let points = TracksManager.getEditablePoints(ctx.selectedGpxFile);
        ctx.selectedGpxFile.layers = getLayersBySelectedTrack(points, ctx.selectedGpxFile.wpts);
        ctx.selectedGpxFile.points = points;

        ctx.selectedGpxFile.newPoint = points[points.length - 1];
        ctx.selectedGpxFile.update = false;

        ctx.creatingRouteMode.mode = ctx.selectedGpxFile.newPoint?.profile ? ctx.selectedGpxFile.newPoint?.profile : TracksManager.PROFILE_LINE;
        ctx.setCreatingRouteMode({...ctx.creatingRouteMode});

        ctx.addFavorite.editTrack = true;
        ctx.setAddFavorite({...ctx.addFavorite});

        ctx.setSelectedGpxFile({...ctx.selectedGpxFile});
    }

    function getLayersBySelectedTrack(points, wpts) {
        let layers = new L.FeatureGroup();
        layers = updateLayers(points, wpts, layers, true);
        layers.addTo(map);
        return layers;
    }

    function deleteOldLayers() {
        if (ctx.selectedGpxFile?.layers) {
            map.removeLayer(ctx.selectedGpxFile?.layers);
        }
    }
}