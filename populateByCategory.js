// fetch a csv file from a url and populate dropdowns by category

function populateDropdownFromCSV() {
    var csvUrl = "https://www.userbenchmark.com/resources/download/csv/CPU_UserBenchmarks.csv";
    var csvData = UrlFetchApp.fetch(csvUrl).getContentText();
    var dataArray = Utilities.parseCsv(csvData);

    // Get unique brands from column 3
    var brandSet = new Set();
    for (var i = 1; i < dataArray.length; i++) {
        var brand = dataArray[i][2];
        if (!brandSet.has(brand)) {
            brandSet.add(brand);
        }
    }
    var brands = Array.from(brandSet);

    // Get filtered options for each brand
    var brand1Array = [];
    var brand2Array = [];
    var maxEntries = 800;
    for (var i = 1; i < dataArray.length; i++) {
        var brand = dataArray[i][2];
        var value = dataArray[i][3];
        if (brand === brands[0]) {
            if (brand1Array.length < maxEntries) {
                brand1Array.push(value);
            }
        } else if (brand === brands[1]) {
            if (brand2Array.length < maxEntries) {
                brand2Array.push(value);
            }
        }
    }

    var items = FormApp.getActiveForm().getItems();

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var title = item.getTitle();
        var id = item.getId();
        Logger.log("Question Title: " + title + ", ID: " + id);
    }

    var brand1DropdownItem = items[2].asMultipleChoiceItem();
    brand1DropdownItem.setChoiceValues(brand1Array);

    var brand2DropdownItem = items[4].asMultipleChoiceItem();
    brand2DropdownItem.setChoiceValues(brand2Array);
}