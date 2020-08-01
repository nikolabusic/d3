<?php
    $details =array();
    for($i = 0; $i < 14; $i++)
    {
        $details[$i] = array("count" => 0, "target_count" => array());
    }
    $key = 0;
    foreach($_POST["details"] as $element)
    {
        if($element != NULL)
        {           
            foreach($element as $val)
            {
                for($index = 0; $index < 14; $index++)
                {
                    $details[$index]["count"] =  $details[$index]["count"] + $val[$index];
                    $details[$index]["target_count"][$key] = $val[$index];
                }
            }
        }
        $key++;
    }
     for($i = 0; $i < 14; $i++)
    {
        echo $details[$i]["target_count"][1] . '<br>';
    }
    $myfile = fopen("data/custom.json", "w") or die("Unable to open file!");
    $txt = json_encode($details);
    fwrite($myfile, $txt);
    fclose($myfile);
?>