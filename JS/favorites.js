$(document).ready(function(){

    /* 1. INITIALIZATION                */
    updateCounter(); 

     /* 2. EVENT LISTENERS                */

    /* REMOVE CARD */
   $(document).on("click", ".btn-remove", function(e){
        e.preventDefault();

        let card = $(this).closest(".favorite-card");

       
        card.addClass("fade-out");

        
        setTimeout(function(){
            card.remove();
            updateCounter();
            checkEmpty();
        }, 300);
    });

    /* SEARCH */
    $("#searchInput").on("keyup", applyAllFilters);
    $(".search-box button").click(applyAllFilters);

    /* APPLY FILTERS BUTTON */
    $("#applyFilters").click(function(){
        applyAllFilters();
        closeFilters(); 
    });

    /* RESET FILTERS */
     $("#resetFilters").click(function(){
        $("#filterForm")[0].reset();
        $("#searchInput").val("");
        applyAllFilters();
    });

     /* SORTING */
    $("input[name='sort']").change(function(){
        sortCards($(this).val());
    });

    /* SIDEBAR TOGGLE (open filters) */
    document.querySelector(".sidebar-toggle").addEventListener("click", function(){
    document.querySelector(".filters").classList.add("active");
    document.querySelector(".overlay").classList.add("active");
        if(window.innerWidth > 1024){
            document.querySelector(".content-area").classList.add("shifted");
        }
        this.style.display = "none"; 
    });

    /* CLOSE SIDEBAR (click overlay) */
    document.querySelector(".overlay").addEventListener("click", closeFilters);

     /* 3. FUNCTIONS                */

    /* Update Favorites Counter */
    function updateCounter(){
        let visibleCards = $(".favorite-card:visible").length;

        $("#favoritesCounter").text(
            "You have " + visibleCards + " saved destinations"
        );
    }

    /* Check if list is empty */
    function checkEmpty(){
        if($(".favorite-card").length === 0){
            $("#favoritesGrid").html(
                "<div class='empty-state'>" +
                    "<h2>No favorites yet ✈️</h2>" +
                    "<p>Start exploring destinations and add them to your list!</p>" +
                "</div>"
            );
        }
    }

    /* Apply all filters + search */
    function applyAllFilters(){

        let searchValue = $("#searchInput").val().toLowerCase();

       
        let continents = $("#continentFilter input:checked")
            .map(function(){ return this.value; }).get();

        
        let categories = $("#categoryFilter input:checked")
            .map(function(){ return this.value; }).get();

        
        let ratings = $("#ratingFilter input:checked")
            .map(function(){ return parseInt(this.value); }).get();

       
        let budget = $("input[name='budget']:checked").val();

        $(".favorite-card").each(function(){

            let card = $(this);

            let name = card.data("name").toLowerCase();
            let continent = card.data("continent");
            let category = card.data("category");
            let rating = parseInt(card.data("rating"));
            let cardBudget = card.data("budget");

            let matchSearch = name.includes(searchValue);

            let matchContinent = continents.length === 0 || continents.includes(continent);
            let matchCategory = categories.length === 0 || categories.includes(category);
            let matchRating = ratings.length === 0 || ratings.some(r => rating >= r);
            let matchBudget = !budget || cardBudget === budget;

            card.toggle(
                matchSearch &&
                matchContinent &&
                matchCategory &&
                matchRating &&
                matchBudget
            );
        });

        updateCounter();
    }

    /* Close filters sidebar */
    function closeFilters() {
        
        document.querySelector(".filters").classList.remove("active");
        document.querySelector(".overlay").classList.remove("active");
        
        document.querySelector(".content-area").classList.remove("shifted");

        document.querySelector(".sidebar-toggle").style.display = "block";
    }

    /* Sort cards A-Z / Z-A */
    function sortCards(order){
        let cards = $(".favorite-card").get();

        cards.sort(function(a,b){
            let nameA = $(a).data("name").toLowerCase();
            let nameB = $(b).data("name").toLowerCase();

            if(order === "az"){
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        $.each(cards, function(i, card){
            $("#favoritesGrid").append(card);
        });
    }
});
