import React from "react"
import Helmet from 'react-helmet';

const CookieHubBanner = ({ googleTrackingId, cookieHubId }) => {
    const googleUrl = "https://www.googletagmanager.com/gtag/js?id=" + googleTrackingId
    const cookieHubUrl = "https://cookiehub.net/c2/" + cookieHubId + ".js"
    return (
        <Helmet
            script={[
                {
                    type: "text/javascript",
                    src: googleUrl
                },
                {
                    type: "text/javascript",
                    innerHTML:
                        `var gtagId = '`+googleTrackingId+`';
                        window['ga-disable-' + gtagId] = true;
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments)}
                        gtag('js', new Date());`
                },
                {
                    type: "text/javascript",
                    innerHTML:
                        `var cpm = {};
                        (function(h,u,b){
                        var d=h.getElementsByTagName("script")[0],e=h.createElement("script");
                        e.async=true;e.src='`+cookieHubUrl+`';
                        e.onload=function(){u.cookiehub.load(b);}
                        d.parentNode.insertBefore(e,d);
                        })(document,window,cpm);`
                },
                {
                    type: "text/javascript",
                    innerHTML:
                        `window.addEventListener("load", function() {
                            window.cookieconsent.initialise({
                            onInitialise: function(status) {
                                if (this.hasConsented('required')) {
                                }
                                if (this.hasConsented('analytics')) {
                                    window['ga-disable-`+googleTrackingId+`'] = false;
                                    gtag('config', gtagId);
                                }
                                if (this.hasConsented('marketing')) {
                                }
                            },
                            onAllow: function(category) {
                                if (category == 'required') {
                                }
                                if (category == 'analytics') {
                                    window['ga-disable-`+googleTrackingId+`'] = false;
                                    gtag('config', gtagId);
                                }
                                if (category == 'marketing') {
                                }
                            },
                            onRevoke: function(category) {
                                if (category == 'required') {
                                }
                                if (category == 'analytics') {
                                    window['ga-disable-`+googleTrackingId+`'] = true;
                                }
                                if (category == 'marketing') {
                                }
                            }
                        })
                    });`
                }
            ]}
        />
    )
}

export default CookieHubBanner
