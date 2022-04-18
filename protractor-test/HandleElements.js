describe("Testing out CRUD functions", function(){

	//Test Create
	it('it should add book as covenant', function() {
	    browser.get('http://localhost:4200/add-book');
        browser.waitForAngularEnabled(true);   
        browser.sleep(2000);
        element(by.css("input[formControlName=name]")).sendKeys('Stay On the Bus');
        element(by.css("input[formControlName=price]")).sendKeys('120');
        element(by.css("input[formControlName=description]")).sendKeys('“What to do? Its simple. Stay on the bus. Why, because if you do, in time you will begin to see a difference.');
        browser.sleep(3000);
        element(by.buttonText('Add Book')).click();
    });

	// Test Update
    it('it should update a book', function() {
	    browser.get('http://localhost:4200/books-list');
        browser.waitForAngularEnabled(true);   
        browser.sleep(3000);
        element.all(by.css('tbody>tr')).each(function(row, index){
        	if(index === 0){
        		row.element(by.buttonText('Edit')).click();
		        browser.sleep(3000);
        		element(by.css("input[formControlName=name]")).sendKeys(protractor.Key.CONTROL, "a", protractor.Key.NULL,
                   "Dont Stay On the Bus");
        		element(by.css("input[formControlName=description]")).sendKeys(protractor.Key.CONTROL, "a", protractor.Key.NULL, '“What to do? Its simple. Dont Stay on the bus. Why, because if you do, in time you will begin to see a difference.');
    			browser.sleep(3000);
    			element(by.buttonText('Update')).click();
        	}
        });
    });

	// Verify Records
    it('it should check if book details is correct', function() {
	    browser.get('http://localhost:4200/books-list');
        browser.waitForAngularEnabled(true);   
        browser.sleep(2000);

        // Check first tr element and td if has `Dont Stay On the Bus`
       	element.all(by.css('tbody>tr')).each(function(row, index){
       		if(index === 0){
       			var rowElems = row.$$('td');
       			expect(rowElems.get(0).getText()).toMatch('Dont Stay On the Bus');
       		}
       	});
    });

    // Test Delete First tr Record
    it('it should delete first record book', function() {
	    browser.get('http://localhost:4200/books-list');
        browser.waitForAngularEnabled(true);   
        browser.sleep(2000);
        element.all(by.css('tbody>tr')).each(function(row, index){
       		if(index === 0){
        		row.element(by.buttonText('Delete')).click();
        		browser.switchTo().alert().accept(); // Press ok on alert box
        	}
       	});
        browser.sleep(2000);
       	element.all(by.css('tbody>tr')).each(function(row, index){
       		if(index === 0){
       			var rowElems = row.$$('td');
       			expect(rowElems.get(0).getText() !== 'Dont Stay On the Bus').toBe(true);
       		}
       	});
    });
});