<?php
$myfile = fopen("data/custom.json", "r") or die("Unable to open file!");
$details = json_decode(fread($myfile,filesize("data/custom.json")));
//print_r( $details );
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Find out Dental Professionals near you!</title>

        <meta name="viewport" content="width=device-width">

        <link rel="icon" href="favicon.ico">
        <link href='//fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>
        <link href='//fonts.googleapis.com/css?family=Inconsolata:400,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
        
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
        <script type="text/javascript" src="scripts/libs/jquery-2.0.2.min.js"></script>
        
        <link rel="stylesheet" href="styles/styles.css"/>
    </head>
    
    <script type="text/javascript">
        function addPlace()
        {
            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", "http://maps.google.com/maps/api/geocode/json?address=" + document.getElementById("place_search").value + "&sensor=false", false );
            xmlHttp.send( null );
                 
            var obj = JSON.parse(xmlHttp.responseText);
            //alert(obj.results[0].geometry.location.lat + ", " + obj.results[0].geometry.location.lng);
            addPlace_JS(obj.results[0].geometry.location.lat, obj.results[0].geometry.location.lng, document.getElementById("person_type").value);
        }
    </script>

    <body class="hiddencopy">
        <div id="fb-root"></div>

        <header>
            <h1><strong>GLOBAL DENTAL NETWORK (GDN)</strong></h1>
            
        </header>
        
        <ul class="controls" id="controls">
        
            <li class="map flat"></li>
            <li class="map globe"></li>
            <li class="color">
                <i class="fa fa-fw fa-square-o"></i>
            </li>
            <li class="zoom in">
                <i class="fa fa-fw fa-search-plus "></i>
            </li>
            <li class="zoom out">
                <i class="fa fa-fw fa-search-minus "></i>
            </li>
            
        </ul>

		<canvas id="graph" class="graph"></canvas>
		<div id="base" class="base collapse">
            <ul class="type-icons">
                <li data-detectiontype="gd" class="symbol oas" ><i class="fa fa-floppy-o"></i></li>
                <li data-detectiontype="omp" class="symbol ods" ><i class="fa fa-folder"></i></li>
                <li data-detectiontype="pds" class="symbol wav" ><i class="fa fa-cloud-download"></i></li>
                <li data-detectiontype="ods" class="symbol mav" ><i class="fa fa-envelope"></i></li>
                <li data-detectiontype="omb" class="symbol ids" ><i class="fa fa-tasks"></i></li>
                <li data-detectiontype="om" class="symbol vul" ><i class="fa fa-bug"></i></li>
                <li data-detectiontype="gph" class="symbol vul" ><i class="fa fa-bug"></i></li>
                <li data-detectiontype="oms" class="symbol vul"><i class="fa fa-bug"></i></li>
                <li data-detectiontype="eds" class="symbol vul"><i class="fa fa-bug"></i></li>
                <li data-detectiontype="prds" class="symbol vul"><i class="fa fa-bug"></i></li>
                <li data-detectiontype="pd" class="symbol vul"><i class="fa fa-bug"></i></li>
                <li data-detectiontype="dmr" class="symbol vul"><i class="fa fa-bug"></i></li>
                <li data-detectiontype="rd" class="symbol vul"><i class="fa fa-bug"></i></li>
                <li data-detectiontype="scd" class="symbol vul"><i class="fa fa-bug"></i></li>
            </ul>
            <div id="livestats" class="trapezoid"><span class="encopy">View Details</span> <i class="fa fa-angle-up"></i></div>
            <div class="panel">
                
                <!-- each <li> contains a div with an id of [detection type]-count for number count display -->

                <!-- <div id="topinfected" class="topinfected">
                    <h3>
                        <span class="encopy">MOST INFECTED</span>
                    </h3>
                    <ol id="topinfectedlist">
                        
                    </ol>
                </div> -->

                <ul id="detectcount">
                    <li class="numberof numgd">
                        <div class="vr-mask">
                            <u>General Dentistry</u>
                            <div class="attack-count" id="gd-count"></div>
                        </div>
                        <button data-detectiontype="gd" id="gd-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numomp">
                        <div class="vr-mask">
                            <u>Oral & Maxiofacial Pathology</u>
                            <div class="attack-count" id="omp-count"></div>
                        </div>
                        <button data-detectiontype="omp" id="omp-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numpds">
                        <div class="vr-mask">
                            <u>Periodontics</u>
                            <div class="attack-count" id="pds-count"></div>
                        </div>
                        <button data-detectiontype="pds" id="pds-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numods">
                        <div class="vr-mask">
                            <u>Orthodontics</u>
                            <div class="attack-count" id="ods-count"></div>
                        </div>
                        <button data-detectiontype="ods" id="ods-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numomb">
                        <div class="vr-mask">
                            <u>Oral Microbiology</u>
                            <div class="attack-count" id="omb-count"></div>
                        </div>
                        <button data-detectiontype="omb" id="omb-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numom">
                        <div class="vr-mask">
                            <u>Oral Medicine</u>
                            <div class="attack-count" id="om-count"></div>
                        </div>
                        <button data-detectiontype="om" id="om-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numgph">
                        <div class="vr-mask">
                            <u>General Public Health</u>
                            <div class="attack-count" id="gph-count"></div>
                        </div>
                        <button data-detectiontype="gph" id="gph-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numoms">
                        <div class="vr-mask">
                            <u>Oral & Maxiofacial Surgery</u>
                            <div class="attack-count" id="oms-count"></div>
                        </div>
                        <button data-detectiontype="oms" id="oms-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numeds">
                        <div class="vr-mask">
                            <u>Endodontics</u>
                            <div class="attack-count" id="eds-count"></div>
                        </div>
                        <button data-detectiontype="eds" id="eds-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numprds">
                        <div class="vr-mask">
                            <u>Prosthodontics</u>
                            <div class="attack-count" id="prds-count"></div>
                        </div>
                        <button data-detectiontype="prds" id="prds-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numpd">
                        <div class="vr-mask">
                            <u>Pediatric Dentistry</u>
                            <div class="attack-count" id="pd-count"></div>
                        </div>
                        <button data-detectiontype="pd" id="pd-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numdmr">
                        <div class="vr-mask">
                            <u>Dental & Maxiofacial Radiology</u>
                            <div class="attack-count" id="dmr-count"></div>
                        </div>
                        <button data-detectiontype="dmr" id="dmr-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numrd">
                        <div class="vr-mask">
                            <u>Restorative Dentistry</u>
                            <div class="attack-count" id="rd-count"></div>
                        </div>
                        <button data-detectiontype="rd" id="rd-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                    <li class="numberof numscd">
                        <div class="vr-mask">
                            <u>Special Care Dentistry</u>
                            <div class="attack-count" id="scd-count"></div>
                        </div>
                        <button data-detectiontype="scd" id="scd-gbtn" class="graphbutton hide">
                            <span class="hidecopy">
                                <span class="encopy">HIDE</span>
                            </span>
                            <span class="showcopy">
                                <span class="encopy">SHOW</span>
                            </span>
                        </button>
                    </li>
                </ul>

                <!-- <p>
                    <span class="encopy">Detection totals reset every day at 0:00:00 GMT.</span>
                </p> -->
            </div>
        </div>

       <!-- <div id="abouttypes" class="tab collapse"><span class="encopy">About Detection Types</span> <i class="fa fa-angle-up"></i></div>
        <div id="about" class="about collapse">
            <span class="encopy">
                <ul class="aboutcontainer">
                    <li class="oas">
                        <a target="_blank" href="http://www.kaspersky.com/advert/multi-device-security?redef=1&THRU&reseller=cybermap">
                            <h2>OAS<i class="fa fa-floppy-o"></i></h2>
                            <p><span class="encopy">The OAS (On-Access Scan) sub-system is triggered when an antivirus program starts scanning objects that are accessed during open, copy, run or save operations. Simply highlighting a malicious object on a flash drive in Windows Explorer will trigger an on-access scan.</span></p>
                        </a>
                    </li>
                    <li class="ods">
                        <a target="_blank" href="http://www.kaspersky.com/anti-virus?redef=1&reseller=cybermap">
                            <h2>ODS<i class="fa fa-folder"></i></h2>
                            <p><span class="encopy">The ODS (On-Demand Scan) sub-system is triggered when the user opens a file context menu and selects the "Scan for viruses" option next to the Kaspersky Lab icon.</span></p>
                        </a>
                    </li>
                    <li class="wav">
                        <a target="_blank" href="http://www.kaspersky.com/pure?redef=1&reseller=cybermap">
                            <h2>WAV<i class="fa fa-cloud-download"></i></h2>
                            <p><span class="encopy">The WAV (Web Anti-Virus) sub-system is triggered when a new 'Web' object appears, i.e. when the html page of a website opens or a file is downloads. It checks the ports specified in the Web Anti-Virus settings.</span></p>
                        </a>
                    </li>
                    <li class="mav">
                        <a target="_blank" href="http://www.kaspersky.com/security-mac?redef=1&reseller=cybermap">
                            <h2>MAV<i class="fa fa-envelope"></i></h2>
                            <p><span class="encopy">The MAV (Mail Anti-Virus) sub-system is triggered when new objects appear in an email application (Outlook, The Bat, Thunderbird). The MAV scans incoming messages and calls OAS when saving attachments to a disk.</span></p>
                        </a>
                    </li>
                    <li class="ids">
                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.kms.free">
                            <h2>IDS<i class="fa fa-tasks"></i></h2>
                            <p><span class="encopy">The IDS (Intrusion Detection System) sub-system scans individual packets and triggers when new objects appear in the network stack (TCP/UDP/IP packets).</span></p>
                        </a>
                    </li>
                    <li class="vul">
                        <a target="_blank" href="http://www.kaspersky.com/small-office-security?redef=1&reseller=cybermap">
                            <h2>VUL<i class="fa fa-bug"></i></h2>
                            <p><span class="encopy">The VLNS (Vulnerability Scan) alert triggers when the VLNS1 module finds malicious executable files in its scan.</span></p>
                        </a>
                    </li>
                </ul>
            </span>
        </div> -->

        <div id="main">
            <canvas id="webgl-canvas"></canvas>
        </div>

        <div style='z-index:11000;position:absolute;left:20px;top:50px;'>
            <span>Place: </span>
            <input type='text' id='place_search' style='background:transparent;border:1px solid #eee; color:white;'/>
			<span>Type: </span>
			<select id='person_type' style='background:transparent;border:1px solid #eee; color:white;'>
				<option value='1'>Oral & Maxiofacial Surgery</option>
				<option value='2'>General Dentistry</option>
				<option value='3'>Periodontics</option>
				<option value='4'>Orthodontics</option>
				<option value='5'>Oral Microbiology</option>
				<option value='6'>Oral Medicine</option>
				<option value='7'>Pediatric Dentistry</option>
				<option value='8'>Prosthodontics</option>
				<option value='9'>Endodontics</option>
				<option value='10'>Oral & Maxiofacial Pathology</option>
				<option value='11'>General Public Health</option>
				<option value='12'>Dental & Maxiofacial Radiology</option>
				<option value='13'>Restorative Dentistry</option>
				<option value='14'>Special Care Dentistry</option>
			</select>
            <input type='button' onclick='addPlace()' value="Add" style='background:transparent;border:1px solid #eee; color:white;'/>
        </div>

        <div id="webgl-splash" class="webgl-splash">
            <div class="webgl-splash-box">
                <div class="webgl-splash-main">
                    SYSTEM REQUIREMENTS<br/>
                    This website uses WebGL technology<br/>
                    For the best experience, please view in Google Chrome
                </div>
                <div class="webgl-splash-sub">
                    <a href="https://www.google.com/intl/en/chrome/browser/">DOWNLOAD CHROME</a>
                </div>
                <div class="webgl-splash-sub">
                    <a id="webgl-proceed" href="#">PROCEED TO EXPERIENCE</a>
                </div>
            </div>
        </div>
        
        <div id="countrypop" class="countrypop hidden" style="display: none;">

            <h3>
                <span class="encopy">COUNTRY NAME HERE</span>
            </h3>

            <ul>
                <li id="gd-popcount" class="gd-popcount" title="General Dentistry"></li>
                <li id="omp-popcount" class="omp-popcount" title="Oral and Maxiofacial Pathology"></li>
                <li id="pds-popcount" class="pds-popcount" title="Periodontics"></li>
                <li id="ods-popcount" class="ods-popcount" title="Orthodontics"></li>
                <li id="omb-popcount" class="omb-popcount" title="Oral Microbiology"></li>
                <li id="om-popcount" class="om-popcount" title="Oral Medicine"></li>
                <li id="gph-popcount" class="gph-popcount" title="General Public Health"></li>
                <li id="oms-popcount" class="oms-popcount" title="Oral & Maxiofacial Surgery"></li>
                <li id="eds-popcount" class="eds-popcount" title="Endodontics"></li>
                <li id="prds-popcount" class="prds-popcount" title="Prosthodontics"></li>
                <li id="pd-popcount" class="pd-popcount" title="Pediatric Dentistry"></li>
                <li id="dmr-popcount" class="dmr-popcount" title="Dental & Maxiofacial Radiology"></li>
                <li id="rd-popcount" class="rd-popcount" title="Restorative Dentistry"></li>
                <li id="scd-popcount" class="scd-popcount" title="Special Care Dentistry"></li>
            </ul>
            <div class="popclose">
                <span class="fa-stack">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-times fa-stack-1x  fa-inverse"></i>
                </span>
            </div>
        </div>

        <script src="scripts/scripts.js"></script>
        
        <script type="text/javascript"> 
            $(function() {
               //var details = [10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,140000];
                var details = <?php echo json_encode($details); ?>;
                main();
                JOSHUA.Global.custom(details);
                JOSHUA.Global.init();
            });
        </script>

    </body>
</html>
