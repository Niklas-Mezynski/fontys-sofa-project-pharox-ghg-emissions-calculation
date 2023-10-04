$dataVersion = "^0"
$source = "GLEC"
$resultsPage = "100"
$pagesNum = 1
$queryPage = 1

# Request params
$headers = [ordered]@{"Content-Type"="application/json"; "Authorization"="Bearer KA6B5H0KQ84SGNGPE788YF0DEG1A"}
$method = "GET"
$uri = 'https://beta4.api.climatiq.io/search?source={0}&data_version={1}&results_per_page={2}' -f $source, $dataVersion, $resultsPage

# Do request and transform to response content to JSON
$response = Invoke-WebRequest -Uri $uri -Method $method -Headers $headers
$json = ConvertFrom-Json $($response.Content)

# Update total number of pages
$pagesNum = [int]$json.last_page

# Init the output file
"[" | Out-File "..\assets\emission-factors.json" -Force

# Do as many queries as pages and add to JSON file
while($queryPage -le $pagesNum)
{
    $uri = 'https://beta4.api.climatiq.io/search?source={0}&data_version={1}&page={2}&results_per_page={3}' -f $source, $dataVersion, $queryPage, $resultsPage

    # Do request and transform to response content to JSON
    $response = Invoke-WebRequest -Uri $uri -Method $method -Headers $headers
    $json = ConvertFrom-Json $($response.Content)

    # Remove [] from JSON array
    $fileName = '..\assets\emission-factors.json'
    $emissionFactors = $json.results | ConvertTo-Json -depth 100 
    $emissionFactors = $emissionFactors.Substring(1, $emissionFactors.length - 4)

    # Add comma if not last page (Append following pages)
    if (($pagesNum - $queryPage) -gt 0) {
        $emissionFactors = $emissionFactors + ","
    }

    # Append fetched results to the existing emission factors file
    $emissionFactors | Out-File $fileName -Append -NoNewline

    # Next page
    $queryPage++
}

# Close the new generated JSON Array
$fileContent = Get-Content "..\assets\emission-factors.json" -Raw
"`n]" | Out-File "..\assets\emission-factors.json" -Append -NoNewline