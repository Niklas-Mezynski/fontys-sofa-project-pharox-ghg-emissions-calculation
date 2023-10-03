$dataVersion = "^3"
$source = "GLEC"
$page = "1"
$resultsPerPage = "100"

$headers = [ordered]@{"Content-Type"="application/json"; "Authorization"="Bearer 855Q36PTH14AMSJBYB50R7VXKX0J"}
$method = "GET"

$uri = "https://beta4.api.climatiq.io/search?query=source=GLEC&data_version=^3&results_per_page=100"

Write-Output $uri

$response = Invoke-WebRequest -Uri $uri -Method $method -Headers $headers

$json = ConvertFrom-Json $($response.Content)

Write-Output $response