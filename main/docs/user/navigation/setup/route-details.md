---
sidebar_position: 4
title:  Route Details
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import AndroidStore from '@site/src/components/buttons/AndroidStore.mdx';
import AppleStore from '@site/src/components/buttons/AppleStore.mdx';
import LinksTelegram from '@site/src/components/_linksTelegram.mdx';
import LinksSocial from '@site/src/components/_linksSocialNetworks.mdx';
import Translate from '@site/src/components/Translate.js';
import InfoIncompleteArticle from '@site/src/components/_infoIncompleteArticle.mdx';
import ProFeature from '@site/src/components/buttons/ProFeature.mdx';
import InfoAndroidOnly from '@site/src/components/_infoAndroidOnly.mdx';

<InfoIncompleteArticle/>


## Overview

The OsmAnd allows you to find the best route and explore all of its details. The app provides detailed information about the entire route, including distance, travel time, surface type, elevation differences, and turn information. You can also analyze the route on the map, find out information about track segments, print the route plan, save the route, and share it with others. With this functionality, you will always be aware of the route details and can plan your trip more efficiently.  


### How to open

The route information from the Details section of the navigation menu of the app is only available when the track has already been calculated. You can use them before you start your trip, to improve your planning, and during your trip.  
There are three ways to access the Route Details menu.   

1. Go to the main *Menu → Navigation*, set the route, and tap the *Details* button.
2. Tap the Navigation icon on the map screen, set the route, and tap the Details button.
3. Go to the My Places menu, tap any available track in the list *Menu → My Places → Tracks*, select the Navigation icon in the track context menu in the Overview, and tap Details.  

<!-- ? -->
Depending on the selected [profile settings](../../personal/profiles.md) and the selected [routing type](../routing/#routing-types), route details may not be fully displayed. The display of a number of details is also affected by the availability of map section information, GPS data, terrain and road information, and your [subscription](../../purchases/index.md).  


<Tabs groupId="operating-systems">

<TabItem value="android" label="Android">

![Route details Android](@site/static/img/navigation/route/navigation_route_android_main-info.png)  

</TabItem>

<TabItem value="ios" label="iOS">

![Route details iOS](@site/static/img/navigation/route/navigation_route_ios_main-info.png)

</TabItem>

</Tabs>


## Distance / time / CO2

CO2 - https://osmand.net/docs/user/navigation/guidance/navigation-settings#fuel-used-by-motor

*Estimated travel time* and *Estimated arrival time*. These values are calculated from the average speed based on the previously selected [settings](../setup/route-navigation.md) and the actual time of day.

The information block with *Average altitude*, *Altitude range*, *Uphill* (or *Ascent* in iOS), *Downhill* (or *Descent* in iOS).  

![Route details](@site/static/img/navigation/route/route_details_distance.png)  


## Elevation info

<!-- ? -->
The main block with the graph contains the following information:

1. The total distance of your route in the selected [units](../../personal/profiles.md#units--formats).
2. *Estimated travel time* and *Estimated arrival time*. These values are calculated from the average speed based on the previously selected [settings](../setup/route-navigation.md) and the actual time of day.  
3. [The graph](#the-graph).
4. The information block with *Average altitude*, *Altitude range*, *Uphill* (or *Ascent* in iOS), *Downhill* (or *Descent* in iOS).
5. [*Analyse on map*](#analyse-on-map) (*Analyse* in iOS) button.


#### Elevation info

The details shows a graph with the elevation and slope of your navigation route and your current location on this graph with current altitude and slope. The graph is plotted on two axes. The X-axis is the distance of your route. The Y-axis is the altitude, the value depends on the relief, and the slope displayed as a percentage.  

All values are indicated either for the whole route or only for the selected interval by scaling the graph.

- ***Location Pin***. The data on the graph of your ***Current location*** contains the location icon, altitude, and percent slope value. The right side of the widget contains data about the highest altitude and slope, the average value for both and the lowest altitude and slope on the selected route section visible on the graph.  
- ***Additional information***. The right side of the widget contains data about the highest altitude and slope, the average value for both and the lowest altitude and slope on the selected route section visible on the graph.  
- ***Grade*** is is the ratio of the path to the horizontal, where zero indicates horizontality and the number of degrees indicates a higher or steeper degree of slope. *Grade* shows the maximum road slope in percent from your location point to the end of the visible graph or for the selected section of the route without location point visible on the screen.  


### The graph

The graphs which are built while recording the current track, show visually the information about the track. All values on the graph are indicated either for the whole route or only for the selected interval (when scaling). The right(Android)/left(iOS) side of the graphs contains data about the highest, average and lowest values. *Overview* - distance and speed, *Altitude* - elevation and grade, *Speed* - speed in current moment.  


#### The graph can be scaled.

- *Zoom in/out*. By default, the graph shows the route from the current location to your destination point. You can use [two-finger movement](../../map/interact-with-map.md#gestures) to zoom in and out for a more detailed view. You can also move the graph to the right, forward on the route, and backward to the current location.  
- *Place a point on the graph*. If you want to see the information at a particular point ahead on your route, you can tap anywhere on the graph and a pointer with the values will appear.  

[Main information](../../map/track-context-menu.md#altitude--speed-graphs): *Total distance, Estimated travel time/Estimated time of arrival, Graph with details*.   


## Analyse on map

A graph with altitude / slope info on distance, additional track data.

[Analyse](../../map/tracks-on-map.md#analyze-track-on-map) on map - This option allows you to interactively view track information with graphs and a map.  

- *Average altitude*
- *Altitude range*
- *Uphill*
- *Downhill*

This option allows you to interactively review track information using graphs and the map. To get access to this menu shortly tap on the *track → [<Translate android="true" ids="shared_string_options"/>](../../map/track-context-menu.md#options) → <Translate android="true" ids="analyze_on_map"/>*  

- **Graph data Y-axis**: Altitude / Slope / Speed (if data is available in the track).
- **Graph dimension X-axis**: Distance / Time / Time of day.
- **Tap/Slide**: tap to Graph for showing info about track point and moving along Graph highlights point location on the map and displays info about point on the bar.
- **Scale**: scale Graph by [two fingers gesture](../../map/interact-with-map.md#gestures). 
- **Follow My location**: click button [My Location](../../map/interact-with-map.md#my-location--zoom), so map view and graph is synchronized with your location. In that case **graph scale** will stay constant and **bar information** will be fixed to 1/4 from the left. As you move, **graph will slide** from left to right displaying information Ahead of your Track. This functionality is useful for hiking & cycling during navigation, though this screen doesn't have other widgets displayed.  

<Tabs groupId="operating-systems">

<TabItem value="android" label="Android">

![Route details Android](@site/static/img/navigation/route/navigation_route_android_analiz.png)  

</TabItem>

<TabItem value="ios" label="iOS">

![Route details iOS](@site/static/img/navigation/route/navigation_route_ios_analiz.png)

</TabItem>

</Tabs>


## Road attributes

To find out how particular road attributes are displayed on the map, see [this section](../../map-legend/osmand.md#routes) of the documentation.    

- [**Road type**](https://wiki.openstreetmap.org/wiki/Key:highway#Roads) - The type of road is determined based on its functional purpose and characteristics, such as the number of lanes, speed limits, load capacity, the presence of pedestrian and bicycle paths, roadsides, and other parameters. Different types of roads may have different restrictions and traffic rules. For example, main [highways](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dmotorway) usually have a high speed limit and can be divided into lanes, and [local roads](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dresidential) can have a low speed limit and one lane in each direction.
- [**Surface**](https://wiki.openstreetmap.org/wiki/Key:surface) - Road surfaces are the top layer of pavement that comes into contact with the wheels of vehicles. They can be of different types depending on their properties and functional purpose. For example, [asphalt](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dasphalt) pavement provides good traction and noise insulation, and [concrete](https://wiki.openstreetmap.org/wiki/Tag:surface%3Dconcrete) pavement is more durable and has greater load capacity. Other materials such as gravel, crushed stone, wood boards, and others can also be used to create a road surface. 
- [**Steepness**](https://wiki.openstreetmap.org/wiki/Key:incline#Common_&_extreme_inclines) - This is a measurement of the angle of the slope of the road, expressed as a percentage. It indicates how steeply the road is sloped up or down in relation to the horizon and is calculated by measuring the vertical change in road elevation by the horizontal distance and multiplying the resulting value by 100%. For example, if the steepness of the road is 10%, that means for every 100 meters of horizontal distance along the road, you are going up or down 10 meters. The steepness of the road can affect your vehicle's speed, braking, fuel consumption, and driving safety, especially on slippery roads in the winter.
- *Surface firmness*
- *Slope* 
- *Smoothness* 
- *Winter and ice roads*
- *Difficulty of horse trails*
- *Speed and Altitude* 

<Tabs groupId="operating-systems">

<TabItem value="android" label="Android">

![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_features.png)   ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_steepness.png)   

</TabItem>

<TabItem value="ios" label="iOS">

![Navigation route iOS](@site/static/img/navigation/route/navigation_route_ios_features.png)

</TabItem>

</Tabs>


## Turn-by-turn information

Turn-by-turn information provides brief instructions for navigating your route, including the next turn, the distance to the turn, the direction of the turn, and the name of the street or trail. Turn information is usually displayed in widgets (links), provides safe and effective real-time navigation, and allows the driver to navigate the road.  

Turn-by-turn information - You can view the details of separate sections of the route by tapping the needed one.

The setting shows information about your next turn with a picture of maneuver and distance to it. There are 2 variants of **next turn** widget (small and big) and **2nd next turn** which is enabled if turn within approaching distance.  


Trigger display time, color is related to the voice navigation prompts and related to the time left to reach maneuvre. So color indication, distance & turn visualization could be used instead of voice navigation.

| Distance |  Prompt type | Color | Approximate Trigger Time | 
|-----|----|-------|------| 
| Close by | [Turn now](../../../technical/algorithms/voice-prompt-triggering.md#trigger-behavior) | Green | 5 seconds | 
| Approaching| [Turn in X m](../../../technical/algorithms/voice-prompt-triggering.md#trigger-behavior) | Yellow | 20 seconds |
| Distant | [Prepare to turn](../../../technical/algorithms/voice-prompt-triggering.md#trigger-behavior) | Grey | > 100 seconds |   

![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_turn.png)


## Actions

The route details navigation section has several buttons that allow you to perform certain actions with the route information.  

- The [*Print*](#print) button allows you to print the route information.
- The *Save* button allows you to save the route information [as a new track](#save-as-a-new-track) for later use.
- The *Export* button allows you to export route information in various formats, such as [GPX](../../../technical/osmand-file-formats/osmand-gpx.md) or [KML](../../../technical/osmand-file-formats/osmand-kml.md), for use in other applications or on other devices.
- The *Share* button gives you the opportunity to share information about your route with other users via social networks, messengers, or other applications.


### Print

<infoAndroidOnly />

The **Print** button feature of a turn-by-turn route description can be useful if you prefer to have a physical copy of your route description instead of using electronic devices, or if you do not have access to navigation apps or GPS navigators, no Internet access, or if you need information for other people traveling with you.

A printed route description provides detailed turn-by-turn instructions on how to navigate your route, including the distance to the next turn, driving direction, and street or trail names, as well as distance and travel time information. This information can be useful when you are planning a trip and want to estimate the time and distance between different points on the route and determine the expected time of arrival.

The ability **to print** or save turn-by-turn information **in pdf format** is especially useful when traveling long distances or in unfamiliar places when you need to have a more detailed idea of the route and the time it takes to get there.

![route details](@site/static/img/navigation/route/route_details_print-2.png)


### Save / Export / Share

<Tabs groupId="operating-systems">

<TabItem value="android" label="Android">

Share buttons: *Share as GPX file* and *Save to OsmAnd tracks*  

![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_share1.png)   ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_share2.png)   

</TabItem>

<TabItem value="ios" label="iOS">

Export button: *Export as GPX file* or *Share as link*  

![Navigation route iOS](@site/static/img/navigation/route/navigation_route_ios_share.png)

</TabItem>

</Tabs>

#### Save as a new track


#### **Share as file**

in gpx https://www.osmand.net/docs/user/plugins/trip-recording#recorded-gpx-file

OsmAnd records tracks in a file in the [GPX format](https://en.wikipedia.org/wiki/GPS_Exchange_Format) according to the following structure: *file > track > segments > points*.

- One point has a number of attributes: coordinates, speed, altitude, heading.
- Points are grouped into tracks.
- The next point after the gap makes up a new segment.
- Both segments and tracks are shown with the Start and Finish icons on the map.

OsmAnd GPX
The OsmAnd's GPX file format conforms to the GPX 1.1 specification with additional data written as extensions. There are several sections of such data https://osmand.net/docs/technical/osmand-file-formats/osmand-gpx/

#### **Share link**

Each link consists of parts containing specific information. For example:  
https://osmand.net/map?start=52.310331,4.863615&end=52.327645,4.863272&mode=pedestrian#15/52.3161/4.8658.
- *start=52.310331,4.863615*- coordinates of the start point.
- If the coordinates are not specified, My Location is used.
- *end=52.327645,4.863272* - coordinates of the end point.
- *mode=pedestrian* - type of [routing](../../navigation/routing/index.md), which depends on the selected profile.
- *#15/52.3161/4.8658* - zoom level and map center coordinates.


<!--
___

## Info for del

<Tabs groupId="operating-systems">

<TabItem value="android" label="Android">

|  |
|------------|
| [Main information](../../map/track-context-menu.md#altitude--speed-graphs): *Total distance, Estimated travel time/Estimated time of arrival, Graph with details*. | 
| ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_main-info.png) |
| [Analyse](../../map/tracks-on-map.md#analyze-track-on-map) on map - This option allows you to interactively view track information with graphs and a map. |
| ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_analiz.png) |
| The features with [map legend](../../map-legend/osmand.md#routes): *Road type, Surface, Steepness, Surface firmness, Slope, Smoothness, Winter and ice roads, Difficulty of horse trails, Speed and Altitude*. |
| ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_features.png)   ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_steepness.png) |
| Turn-by-turn information - You can view the details of separate sections of the route by tapping the needed one. |
| ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_turn.png) |
| Print button - You can print a turn-by-turn description of the route with the total distance and estimated travel time, or save it as a pdf. |
| ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_print.png) |
| Save as new track button. | 
| ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_save.png) |
| Share buttons: *Share as GPX file* and *Save to OsmAnd tracks* |
| ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_share1.png)   ![Navigation route Android](@site/static/img/navigation/route/navigation_route_android_share2.png) |

</TabItem>

<TabItem value="ios" label="iOS">

|  |
|------------|
| [Main information](../../map/track-context-menu.md#altitude--speed-graphs): *Total distance, Estimated travel time/Estimated time of arrival, Graph with details*. | 
| ![Navigation route iOS](@site/static/img/navigation/route/navigation_route_ios_main-info.png) |
| [Analyse](../../map/tracks-on-map.md#analyze-track-on-map) on map - This option allows you to interactively view track information with graphs and a map. |
| ![Navigation route iOS](@site/static/img/navigation/route/navigation_route_ios_analiz.png) |
| The features with [map legend](../../map-legend/osmand.md#routes): *Road type, Surface, Steepness, Surface firmness, Slope, Smoothness, Winter and ice roads, Difficulty of horse trails, Speed and Altitude*. |
| ![Navigation route iOS](@site/static/img/navigation/route/navigation_route_ios_features.png) |
| Save as new track button. | 
| ![Navigation route iOS](@site/static/img/navigation/route/navigation_route_ios_save.png) |
| Export button: *Export as GPX file* or *Share as link* |
| ![Navigation route iOS](@site/static/img/navigation/route/navigation_route_ios_share.png) |

</TabItem>

</Tabs>

:::info
**Share link**.  
Each link consists of parts containing specific information. For example:  
https://osmand.net/map?start=52.310331,4.863615&end=52.327645,4.863272&mode=pedestrian#15/52.3161/4.8658.
- *start=52.310331,4.863615*- coordinates of the start point.
- If the coordinates are not specified, My Location is used.
- *end=52.327645,4.863272* - coordinates of the end point.
- *mode=pedestrian* - type of [routing](../../navigation/routing/index.md), which depends on the selected profile.
- *#15/52.3161/4.8658* - zoom level and map center coordinates.
:::

:::note
The display of some details depends on the availability of map section information, GPS data, subscriptions, or a profile setting.
:::  

-->
