def restaurants(lunchid, restaurants):
    html = '''
    <!DOCTYPE html>
<!-- saved from url=(0076)http://feedus.hackkosice.com:5000/lunch-cdd0f1c2-3816-4339-a832-2819c16c5b84 -->
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>feed.us</title>
    <!--link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">-->
    <link rel="stylesheet" href="static/style.css">
    <script defer="" src="static/all.js"></script>

    <style type="text/css"></style>
</head>
<body>
<div id="react-app">
    <div>
        <section class="section">
            <div class="container">
                <div class="columns is-mobile is-multiline is-centered">
                    <div class="is-flex-touch is-flex-desktop is-narrow has-text-centered column is-narrow"
                         breakpoint="flex-touch" has-text-centered="true"><h1 class="title is-size-1 has-text-centered"
                                                                              style="padding-top: 1rem;">feed<span
                            class="has-text-primary">.</span>us</h1>
                        <article class="media">
                            <div class="media-left" renderas="figure">
                                <figure renderas="p" class="image is-128x128"><img
                                        src="static/e613212546d6c27600379a26cd601365-food_icon.gif"
                                        alt="64x64"></figure>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container has-text-centered"><h1 class="title">What do you fancy?</h1>
                    <h1 class="subtitle">Click one restaurant</h1></div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns is-multiline">'''
    for restaurant in restaurants:
        html += '''<div class="column" has-text-centered="true">
            <center>
                <button tabindex="0" class="is-large is-block is-outlined button" style="height: auto;">
                    <div class="media-content" renderas="figure">
                        '''+restaurant.name+'''
                    </div>
                    <h2 class="subtitle"><strong>'''+str(restaurant.rating)+"% :)  •  "+str(restaurant.distance_mins)+"min"+'''</strong></h2></button>
            </center>
        </div>'''

    html += '''</div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <button tabindex="0" class="is-danger is-fullwidth is-medium is-outlined button">Submit</button>
            </div>
        </section>
    </div>
</div>
<!-- <script type="text/javascript" src="static/main.js"></script> -->  
<script src="static/jquery-3.3.1.min.js"></script>
<script type="text/javascript">(function () {
    window.SIG_EXT = {};
})()</script>
<script>
    function post(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }

    $(function () {
        $("button").on("click", function(){
            $(this).toggleClass("is-active");
        })
        $("button").last().on("click", function () {
            btns = $("button");
            meals = []
            for (var i = 0; i < btns.length-1; i++) {
                if ($(btns[i]).hasClass("is-active")) {
                    meals.push($.trim($(btns[i]).text()))
                }
            }
            post("lunch-" + "'''+lunchid+'''" + "-restaurants", {
                meals: meals.join("$")
            });
        })
    });
</script>
</body>
</html>
    '''
    return html