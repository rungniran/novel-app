<?php
$url = "https://novelkingdom.co/api/guest/fetch-novel-header/E480F6FB-F587-4CC1-AD03-354551864A11";
$response = file_get_contents($url);
$data=json_decode($response);
echo '<pre>';
print_r($data->data);
echo '</pre>';
?>

<img  src="<?php echo $data->data->image_data->url  ?>" width="500px" class="nv-img-novel img-novel">
