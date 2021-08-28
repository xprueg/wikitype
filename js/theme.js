void function ThemeController() {
    const self = Object.create(null);

    // FIXME: Do transpile while compiling the theme instead of each on their own.
    function transpile(x) {
        return Object.fromEntries(Object.entries(x)
                                        .map(([k, v]) => [k.replace(/^__/, '--')
                                                           .replace(/([A-Z])/g, '-$1')
                                                           .toLowerCase(), v])
        );
    }

    void function init() {
        self.node = ƒ('html');
        self.active_theme = º.req`theme :getSelected`();
        // Variables that can be controlled by the user.
        self.user = {
            __uFontFactor: 1,
        };
        self.themes = {
            base: transpile({
                __asideWidth: '70px',
                __mainPadding: '20px',
                __lap: '30px',
                __articleExtractLetterSpacing: 'normal',
                __kRandArticleBound: 0,

                // Navigation
                __upcomingOptionHeight:     '80px',
                __upcomingOptionFontSize:   '46px',

                // Article
                __articleCaretWidth:          '1px',
                __articleCaretColor:          'var(--dark)',
                __articleCaretScaleY:         '1',

                // Aside
                __asideColor: 'var(--dark)',

                // Settings
                __settingsBackground:  'var(--bright)',
                __settingsColor:       'var(--dark)',
                __settingsBorderColor: 'var(--dark)',

                // Shortcuts
                __shortcutBackground: 'transparent',
                __shortcutText:       'var(--dark)',
                __shortcutBox:        'var(--bright)',
            }),

            zens: transpile({
                name:   'Zensur',
                extend: 'base',

                // Theme specific
                __lap: "0px",

                // Colors
                __dark:   'hsl(220, 9%, 9%)',
                __bright: 'white',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground:  'var(--bright)',

                // History
                __historyBase:     'hsl(0, 0%, 80%)',
                __historyContrast: 'var(--bright)',

                // Article
                __articleBaseWidth:           '100vw',
                __articleWidthShift:          '0px',
                __articleBaseHeight:          '100vh',
                __articleHeightShift:         '0px',
                __articleLoadingSpinnerColor: 'var(--dark)',
                __articleCaretWidth:          '2px',
                __articleCaretColor:          'var(--dark)',
                __articleCaretScaleY:         '1.2',
                __articleFrameBackground:     'none',

                // Thumbnail
                __articleThumbnailBorder:       'none',
                __articleThumbnailMixBlendMode: 'none',
                __articleThumbnailFilter:       '',

                // Extract
                __articleExtractFont:
                    `400 clamp(20px, calc(1vw * 3 * var(--u-font-factor)), 60px)/
                     1.35em GTAmericaLC-ExpRg`,
                __articleExtractLetterSpacing:       '0',
                __articleExtractFontFeatureSettings: '"kern", "liga", "ss05", "ss02", "onum"',

                // Tokens
                __tokenUpcomingColor:      'var(--dark)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'transparent',
                __tokenActiveBackground:   `var(--dark)`,
                __tokenProgressColor:      'var(--dark)',
                __tokenProgressBackground: 'var(--bright)',
                __tokenProgressTextShadow: 'none',
                __tokenTypedColor:         'transparent',
                __tokenTypedBackground:    `linear-gradient(var(--dark), var(--dark)) 0 0/
                                            calc(100% - 1ex) 100% no-repeat`,
                __tokenErrorColor:         'var(--bright)',
                __tokenErrorBackground:    'var(--dark)',

                // Navigation
                __upcomingOptionBackground: 'var(--dark)',
                __upcomingOptionColor:      'var(--bright)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'normal',
                __asideThumbnailFilter:       'opacity(.3) contrast(4)',
            }),

            note: transpile({
                name:   'Note',
                extend: 'base',

                // Theme specific
                __lap: "50px",

                // Colors
                __dark:   'hsl(56.47, 87.79%, 12.51%)',
                __bright: 'hsl(56.47, 8.1%, 55.93%)',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground:  'var(--bright)',

                // History
                __historyBase:     'var(--dark)',
                __historyContrast: 'var(--bright)',

                // Article
                __articleBaseWidth:           '700px',
                __articleWidthShift:          '0px',
                __articleBaseHeight:          '700px',
                __articleHeightShift:         '0px',
                __articleLoadingSpinnerColor: 'hsl(56, 86%, 15%)',
                __articleFrameBackground: `
                    linear-gradient(
                        135deg,
                        var(--bright), var(--bright) 50%, hsla(0, 0%, 0%, .2) 50%)
                        var(--article-frame-x) var(--article-frame-y)/
                        calc(var(--lap) * .5) calc(var(--lap) * .5)
                        no-repeat,
                    linear-gradient(
                        hsl(56, 98%, 59%), hsl(56, 98%, 59%))
                        var(--article-frame-x) var(--article-frame-y)/
                        var(--article-frame-width)
                        calc(var(--article-frame-height) - var(--lap))
                        no-repeat,
                    linear-gradient(
                        hsla(0, 0%, 0%, .2), hsla(0, 0%, 0%, .2))
                        calc(var(--article-frame-x) + 10px) calc(var(--article-frame-y) + 10px)/
                        var(--article-frame-width)
                        calc(var(--article-frame-height) - var(--lap))
                        no-repeat
                `,

                // Thumbnail
                __articleThumbnailBorder:       '0',
                __articleThumbnailMixBlendMode: 'darken',
                __articleThumbnailFilter:       'grayscale(1)',

                // Extract
                __articleExtractFont:                'calc(34px * var(--u-font-factor))/1.4em Grafier-Regular',
                __articleExtractFontFeatureSettings: '"ss02"',

                // Tokens
                __tokenUpcomingColor:      'hsl(56, 86%, 15%)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'hsl(56, 89%, 58%)',
                __tokenActiveBackground:   'transparent',
                __tokenProgressColor:      'hsl(56, 86%, 15%)',
                __tokenProgressBackground: 'hsl(56, 100%, 85%)',
                __tokenProgressTextShadow: 'none',
                __tokenTypedColor:         'hsl(56, 89%, 58%)',
                __tokenTypedBackground:    'transparent',
                __tokenErrorColor:         'hsl(13.06, 78.57%, 48.44%)',
                __tokenErrorBackground:    'hsla(26.11, 88.68%, 17.22%, 1)',

                // Navigation
                __upcomingOptionBackground: 'var(--dark)',
                __upcomingOptionColor:      'var(--bright)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'soft-light',
                __asideThumbnailFilter:       'grayscale(1)',
            }),

            neon: transpile({
                name:   'Neon',
                extend: 'base',

                // Theme specific
                __cHandleSize:      '4.5px',
                __chs:              'var(--c-handle-size)',
                __cSmallHandleSize: '2px',
                __cBorderSize:      '2px',
                __cbs:              'var(--c-border-size)',
                __cfx:              'var(--article-frame-x)',
                __cfy:              'var(--article-frame-y)',
                __cfw:              'var(--article-frame-width)',
                __cfh:              'var(--article-frame-height)',

                // Colors
                __dark:   'black',
                __bright: 'white',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground: `
                    linear-gradient(90deg,
                        var(--bright), var(--bright) var(--aside-width),
                        transparent var(--aside-width)),
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .04) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .04) 75%, hsla(0, 0%, 100%, .04))
                        0 0/50px 50px,
                    linear-gradient(45deg,
                        hsla(0, 0%, 100%, .04) 25%, transparent 25%, transparent 75%,
                        hsla(0, 0%, 100%, .04) 75%, hsla(0, 0%, 100%, .04))
                        calc(50px / 2) calc(50px / 2)/50px 50px,
                    radial-gradient(at 0% 0%, magenta, cyan)
                `,

                // History
                __historyBase:     'var(--bright)',
                __historyContrast: 'var(--dark)',

                // Article
                __articleBaseWidth:           '800px',
                __articleWidthShift:          '50px',
                __articleBaseHeight:          '500px',
                __articleHeightShift:         '50px',
                __articleLoadingSpinnerColor: 'hsl(0, 0%, 100%, .7)',
                __articleCaretWidth:          '0',
                __articleFrameBackground: `
                    /* TOP LEFT HANDLE */
                    radial-gradient(
                        circle at
                            calc(var(--cfx) + var(--cbs) / 2)
                            calc(var(--cfy) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),
                    /* TOP RIGHT HANDLE */
                    radial-gradient(
                        circle at calc(
                            var(--cfx) + var(--cfw) - var(--cbs) / 2)
                            calc(var(--cfy) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),
                    /* BOTTOM LEFT HANDLE */
                    radial-gradient(
                        circle at
                            calc(var(--cfx) + var(--cbs) / 2)
                            calc(var(--cfy) + var(--cfh) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),
                    /* BOTTOM RIGHT HANDLE */
                    radial-gradient(
                        circle at calc(
                            var(--cfx) + var(--cfw) - var(--cbs) / 2)
                            calc(var(--cfy) + var(--cfh) + var(--cbs) / 2),
                        transparent var(--c-small-handle-size),
                        var(--bright) var(--c-small-handle-size), var(--bright) var(--c-handle-size),
                        transparent var(--c-handle-size)
                    ),

                    /* BORDER TOP */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--chs) + var(--cfx)) var(--cfy)/
                        calc(var(--cfw) - var(--chs) * 2) var(--c-border-size) no-repeat,
                    /* BORDER RIGHT */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--cfx) + var(--cfw) - var(--c-border-size))
                        calc(var(--chs) + var(--cfy))/
                        var(--c-border-size) calc(var(--cfh) - var(--chs) * 2 + var(--cbs)) no-repeat,
                    /* BORDER BOTTOM */
                    linear-gradient(var(--bright), var(--bright))
                        calc(var(--chs) + var(--cfx)) calc(var(--cfy) + var(--cfh))/
                        calc(var(--cfw) - var(--chs) * 2) var(--c-border-size) no-repeat,
                    /* BORDER LEFT */
                    linear-gradient(var(--bright), var(--bright))
                        var(--cfx) calc(var(--chs) + var(--cfy))/
                        var(--c-border-size) calc(var(--cfh) - var(--chs) * 2 + var(--cbs)) no-repeat
                `,

                // Thumbnail
                __articleThumbnailBorder:       '2px solid var(--article-image-border-color)',
                __articleThumbnailMixBlendMode: '',
                __articleThumbnailFilter:       '',

                // Extract
                __articleExtractFont:                'calc(32px * var(--u-font-factor))/1.5em Inter',
                __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                      "cv10", "cv11"`,

                // Tokens
                __tokenUpcomingColor:      'var(--bright)',
                __tokenUpcomingBackground: 'transparent',
                __tokenActiveColor:        'hsla(0, 0%, 100%, .2)',
                __tokenActiveBackground:   'hsla(0, 0%, 0%, .1)',
                __tokenProgressColor:      'var(--dark)',
                __tokenProgressBackground: 'var(--bright)',
                __tokenProgressTextShadow: '0 0 30px #f3eb95',
                __tokenTypedColor:         'hsla(0, 0%, 100%, .2)',
                __tokenTypedBackground:    'transparent',
                __tokenErrorColor:         'hsl(360, 100%, 9.25%)',
                __tokenErrorBackground:    'hsl(360, 100%, 59.25%)',

                // Navigation
                __upcomingOptionBackground: 'var(--bright)',
                __upcomingOptionColor:      'var(--dark)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'difference',
                __asideThumbnailFilter:       '',

                // Shortcuts
                __shortcutBackground: 'var(--bright)',
            }),

            term: transpile({
                name:   'Terminal',
                extend: 'base',

                // Theme specific
                __lap: '0px',

                // Colors
                __dark:   'hsl(80, 55%, 8%)',
                __bright: 'hsl(83, 97%, 58%)',

                // Border
                __globalBorderSize:  '0',
                __globalBorderColor: 'transparent',

                // Background
                __bodyBackground: `
                    linear-gradient(90deg,
                        var(--dark), var(--dark) var(--aside-width),
                        transparent var(--aside-width)),
                    radial-gradient(circle at center center,
                       var(--dark), transparent),
                    hsl(80, 35%, 8%)
                `,

                // Aside
                __asideColor:      'var(--bright)',

                // Settings
                __settingsBackground: 'var(--dark)',
                __settingsColor:      'var(--bright)',
                __settingsBorderColor: 'var(--bright)',

                // History
                __historyBase:     'var(--bright)',
                __historyContrast: 'var(--dark)',

                // Article
                __articleBaseWidth:           '900px',
                __articleWidthShift:          '50px',
                __articleBaseHeight:          '500px',
                __articleHeightShift:         '50px',
                __articleLoadingSpinnerColor: 'var(--bright)',
                __articleCaretWidth:          '0',
                __articleFrameBackground: `
                    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='950px' height='700px'%3E%3Cg fill-rule='evenodd'%3E%3Cpath d='M950,700 L5.68434189e-14,700 L0,0 L950,0 L950,700 Z M25,200 L50,200 L50,225 L50,250 L75,250 L75,225 L75,200 L100,200 L125,200 L125,175 L75,175 L75,150 L50,150 L50,175 L0,175 L0,200 L25,200 Z M850,550 L875,550 L875,575 L875,600 L900,600 L900,575 L900,550 L925,550 L950,550 L950,525 L900,525 L900,500 L875,500 L875,525 L825,525 L825,550 L850,550 Z M825,650 L825,635 L788,635 L788,660 L825,660 L825,650 Z M25,100 L50,100 L50,125 L50,150 L75,150 L75,125 L75,100 L100,100 L125,100 L125,75 L75,75 L75,50 L50,50 L50,75 L0,75 L0,100 L25,100 Z M850,450 L875,450 L875,475 L875,500 L900,500 L900,475 L900,450 L925,450 L950,450 L950,425 L900,425 L900,400 L875,400 L875,425 L825,425 L825,450 L850,450 Z M825,525 L800,525 L800,550 L825,550 L825,525 Z M825,450 L825,425 L775,425 L775,450 L825,450 Z M425,550 L425,525 L475,525 L475,500 L425,500 L425,450 L400,450 L400,500 L350,500 L350,525 L400,525 L400,550 L425,550 Z M400,550 L375,550 L375,575 L400,575 L400,550 Z M375,600 L375,575 L350,575 L350,600 L375,600 Z M425,575 L450,575 L450,550 L425,550 L425,575 Z M475,600 L475,575 L450,575 L450,600 L475,600 Z M600,275 L625,275 L625,250 L600,250 L600,275 Z M550,200 L550,175 L600,175 L600,150 L550,150 L550,100 L525,100 L525,150 L475,150 L475,175 L525,175 L525,200 L550,200 Z M525,200 L500,200 L500,225 L525,225 L525,200 Z M500,250 L500,225 L475,225 L475,250 L500,250 Z M550,225 L575,225 L575,200 L550,200 L550,225 Z M600,250 L600,225 L575,225 L575,250 L600,250 Z M425,450 L425,425 L475,425 L475,400 L425,400 L425,350 L400,350 L400,400 L350,400 L350,425 L400,425 L400,450 L425,450 Z M400,450 L375,450 L375,475 L400,475 L400,450 Z M375,500 L375,475 L350,475 L350,500 L375,500 Z M425,475 L450,475 L450,450 L425,450 L425,475 Z M475,500 L475,475 L450,475 L450,500 L475,500 Z M550,100 L550,75 L600,75 L600,50 L550,50 L550,0 L525,0 L525,50 L475,50 L475,75 L525,75 L525,100 L550,100 Z M525,100 L500,100 L500,125 L525,125 L525,100 Z M500,150 L500,125 L475,125 L475,150 L500,150 Z M550,125 L575,125 L575,100 L550,100 L550,125 Z M600,150 L600,125 L575,125 L575,150 L600,150 Z M475,150 L475,125 L400,125 L400,150 L475,150 Z M188,35 L188,0 L163,0 L163,35 L188,35 Z M188,60 L163,60 L163,100 L188,100 L188,60 Z M788,635 L788,600 L763,600 L763,635 L788,635 Z M788,660 L763,660 L763,700 L788,700 L788,660 Z M313,635 L313,600 L288,600 L288,635 L313,635 Z M313,660 L288,660 L288,700 L313,700 L313,660 Z M913,35 L913,0 L888,0 L888,35 L913,35 Z M913,60 L888,60 L888,100 L913,100 L913,60 Z M75,550 L100,550 L100,525 L75,525 L75,550 Z M75,575 L75,600 L100,600 L100,575 L75,575 Z M150,550 L150,525 L125,525 L125,550 L150,550 Z M150,575 L125,575 L125,600 L150,600 L150,575 Z M550,550 L575,550 L575,525 L550,525 L550,550 Z M550,575 L550,600 L575,600 L575,575 L550,575 Z M625,550 L625,525 L600,525 L600,550 L625,550 Z M625,575 L600,575 L600,600 L625,600 L625,575 Z M325,125 L350,125 L350,100 L325,100 L325,125 Z M325,150 L325,175 L350,175 L350,150 L325,150 Z M400,125 L400,100 L375,100 L375,125 L400,125 Z M400,150 L375,150 L375,175 L400,175 L400,150 Z M775,225 L800,225 L800,200 L775,200 L775,225 Z M775,250 L775,275 L800,275 L800,250 L775,250 Z M850,225 L850,200 L825,200 L825,225 L850,225 Z M850,250 L825,250 L825,275 L850,275 L850,250 Z M650,75 L675,75 L675,50 L650,50 L650,75 Z M650,100 L650,125 L675,125 L675,100 L650,100 Z M725,75 L725,50 L700,50 L700,75 L725,75 Z M725,100 L700,100 L700,125 L725,125 L725,100 Z M700,425 L725,425 L725,400 L700,400 L700,425 Z M700,450 L700,475 L725,475 L725,450 L700,450 Z M775,425 L775,400 L750,400 L750,425 L775,425 Z M775,450 L750,450 L750,475 L775,475 L775,450 Z M225,425 L250,425 L250,400 L225,400 L225,425 Z M225,450 L225,475 L250,475 L250,450 L225,450 Z M300,425 L300,400 L275,400 L275,425 L300,425 Z M300,450 L275,450 L275,475 L300,475 L300,450 Z M175,250 L200,250 L200,225 L175,225 L175,250 Z M175,275 L175,300 L200,300 L200,275 L175,275 Z M250,250 L250,225 L225,225 L225,250 L250,250 Z M250,275 L225,275 L225,300 L250,300 L250,275 Z M200,225 L225,225 L225,175 L200,175 L200,225 Z M225,300 L200,300 L200,350 L225,350 L225,300 Z M250,400 L275,400 L275,350 L250,350 L250,400 Z M275,475 L250,475 L250,525 L275,525 L275,475 Z M725,400 L750,400 L750,350 L725,350 L725,400 Z M750,475 L725,475 L725,525 L750,525 L750,475 Z M175,250 L125,250 L125,275 L175,275 L175,250 Z M200,275 L225,275 L225,250 L200,250 L200,275 Z M250,250 L250,275 L300,275 L300,250 L250,250 Z M225,425 L175,425 L175,450 L225,450 L225,425 Z M250,450 L275,450 L275,425 L250,425 L250,450 Z M300,425 L300,450 L350,450 L350,425 L300,425 Z M700,425 L650,425 L650,450 L700,450 L700,425 Z M725,450 L750,450 L750,425 L725,425 L725,450 Z M775,0 L775,25 L800,25 L800,0 L775,0 Z M425,0 L425,25 L450,25 L450,0 L425,0 Z M125,150 L125,175 L150,175 L150,150 L125,150 Z M424,250 L424,275 L449,275 L449,250 L424,250 Z M375,325 L375,350 L400,350 L400,325 L375,325 Z M75,350 L75,375 L100,375 L100,350 L75,350 Z M25,425 L25,450 L50,450 L50,425 L25,425 Z M25,675 L25,700 L50,700 L50,675 L25,675 Z M325,525 L325,550 L350,550 L350,525 L325,525 Z M500,425 L500,450 L525,450 L525,425 L500,425 Z M550,350 L550,375 L575,375 L575,350 L550,350 Z M500,675 L500,700 L525,700 L525,675 L500,675 Z M675,300 L675,325 L700,325 L700,300 L675,300 Z M925,300 L925,325 L950,325 L950,300 L925,300 Z M675,50 L700,50 L700,0 L675,0 L675,50 Z M700,125 L675,125 L675,175 L700,175 L700,125 Z M800,200 L825,200 L825,125 L800,125 L800,200 Z M825,275 L800,275 L800,350 L825,350 L825,275 Z M350,100 L375,100 L375,25 L350,25 L350,100 Z M375,175 L350,175 L350,250 L375,250 L375,175 Z M575,525 L600,525 L600,450 L575,450 L575,525 Z M600,600 L575,600 L575,675 L600,675 L600,600 Z M100,525 L125,525 L125,450 L100,450 L100,525 Z M125,600 L100,600 L100,675 L125,675 L125,600 Z M650,75 L600,75 L600,100 L650,100 L650,75 Z M675,100 L700,100 L700,75 L675,75 L675,100 Z M725,75 L725,100 L775,100 L775,75 L725,75 Z M775,225 L700,225 L700,250 L775,250 L775,225 Z M800,250 L825,250 L825,225 L800,225 L800,250 Z M850,225 L850,250 L925,250 L925,225 L850,225 Z M325,125 L250,125 L250,150 L325,150 L325,125 Z M350,150 L375,150 L375,125 L350,125 L350,150 Z M550,550 L475,550 L475,575 L550,575 L550,550 Z M575,575 L600,575 L600,550 L575,550 L575,575 Z M625,550 L625,575 L700,575 L700,550 L625,550 Z M75,550 L0,550 L0,575 L75,575 L75,550 Z M100,575 L125,575 L125,550 L100,550 L100,575 Z M150,550 L150,575 L225,575 L225,550 L150,550 Z M913,35 L913,60 L950,60 L950,35 L913,35 Z M888,60 L888,35 L850,35 L850,60 L888,60 Z M313,635 L313,660 L350,660 L350,635 L313,635 Z M288,660 L288,635 L250,635 L250,660 L288,660 Z M763,660 L763,635 L725,635 L725,660 L763,660 Z M188,35 L188,60 L225,60 L225,35 L188,35 Z M163,60 L163,35 L125,35 L125,60 L163,60 Z M550,250 L550,200 L525,200 L525,250 L475,250 L475,275 L525,275 L525,300 L550,300 L550,275 L600,275 L600,250 L550,250 Z M500,300 L500,325 L525,325 L525,300 L500,300 Z M475,325 L475,350 L500,350 L500,325 L475,325 Z M550,300 L550,325 L575,325 L575,300 L550,300 Z M575,325 L575,350 L600,350 L600,325 L575,325 Z M425,600 L425,550 L400,550 L400,600 L350,600 L350,625 L400,625 L400,650 L425,650 L425,625 L475,625 L475,600 L425,600 Z M375,650 L375,675 L400,675 L400,650 L375,650 Z M350,675 L350,700 L375,700 L375,675 L350,675 Z M425,650 L425,675 L450,675 L450,650 L425,650 Z M450,675 L450,700 L475,700 L475,675 L450,675 Z M925,400 L925,375 L900,375 L900,400 L925,400 Z M950,375 L950,350 L925,350 L925,375 L950,375 Z M875,400 L875,375 L850,375 L850,400 L875,400 Z M850,375 L850,350 L825,350 L825,375 L850,375 Z M100,50 L100,25 L75,25 L75,50 L100,50 Z M125,25 L125,0 L100,0 L100,25 L125,25 Z M50,50 L50,25 L25,25 L25,50 L50,50 Z M25,25 L25,0 L0,0 L0,25 L25,25 Z M925,500 L925,475 L900,475 L900,500 L925,500 Z M950,475 L950,450 L925,450 L925,475 L950,475 Z M875,500 L875,475 L850,475 L850,500 L875,500 Z M850,475 L850,450 L825,450 L825,475 L850,475 Z M100,150 L100,125 L75,125 L75,150 L100,150 Z M125,125 L125,100 L100,100 L100,125 L125,125 Z M50,150 L50,125 L25,125 L25,150 L50,150 Z M25,125 L25,100 L0,100 L0,125 L25,125 Z M875,650 L875,700 L900,700 L900,650 L950,650 L950,625 L900,625 L900,600 L875,600 L875,625 L825,625 L825,650 L875,650 Z M925,600 L925,575 L900,575 L900,600 L925,600 Z M950,575 L950,550 L925,550 L925,575 L950,575 Z M875,600 L875,575 L850,575 L850,600 L875,600 Z M850,575 L850,550 L825,550 L825,575 L850,575 Z M50,300 L50,350 L75,350 L75,300 L125,300 L125,275 L75,275 L75,250 L50,250 L50,275 L0,275 L0,300 L50,300 Z M100,250 L100,225 L75,225 L75,250 L100,250 Z M125,225 L125,200 L100,200 L100,225 L125,225 Z M50,250 L50,225 L25,225 L25,250 L50,250 Z M25,225 L25,200 L0,200 L0,225 L25,225 Z' fill='hsla(83, 80%25, 9%25, .4)'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")
                    var(--article-frame-x) var(--article-frame-y)/
                    450px auto
                `,

                // Thumbnail
                __articleThumbnailBorder:       'solid 2px var(--bright)',
                __articleThumbnailMixBlendMode: 'color-dodge',
                __articleThumbnailFilter:       'grayscale(0)',

                // Extract
                __articleExtractFont:                `calc(30px * var(--u-font-factor))/
                                                      1.5em "JetBrains Mono", monospace`,
                __articleExtractFontFeatureSettings: `"ss01", "ss02", "case",
                                                      "cv10", "cv11"`,

                // Tokens
                __tokenUpcomingColor:      'var(--dark)',
                __tokenUpcomingBackground: 'var(--bright)',
                __tokenActiveColor:        'hsla(83, 25%, 16.4%, 0.92)',
                __tokenActiveBackground:   `linear-gradient(var(--bright), var(--bright))
                                                0 100%/100% 50% no-repeat,
                                            linear-gradient(var(--dark), var(--dark))
                                                0 0/100% 100% no-repeat`,
                __tokenProgressColor:      'var(--dark)',
                __tokenProgressBackground: 'var(--bright)',
                __tokenProgressTextShadow: '',
                __tokenTypedColor:         'var(--token-active-color)',
                __tokenTypedBackground:    `linear-gradient(
                                                var(--bright), var(--bright))
                                                0 100%/100% 0% no-repeat,
                                            linear-gradient(
                                                var(--dark), var(--dark))
                                                0 0/100% 100% no-repeat`,
                __tokenErrorColor:         'hsl(0, 100%, 9.43%)',
                __tokenErrorBackground:    `linear-gradient(
                                                hsl(0, 97%, 58%),
                                                hsl(0, 97%, 58%) 50%,
                                                hsl(15, 97%, 59%) 50%)`,

                // Navigation
                __upcomingOptionBackground: 'var(--bright)',
                __upcomingOptionColor:      'var(--dark)',

                // Aside Thumbnails
                __asideThumbnailMixBlendMode: 'soft-light',
                __asideThumbnailFilter:       'grayscale(1)',

                // Shortcuts
                __shortcutText:       'var(--bright)',
                __shortcutBox:        'var(--dark)',
            }),
        };

        set_theme_to(self.active_theme);
        apply(transpile(self.user));

        º.emit`shortcut :setMultiple`(
            ['^+', (e) => (self.user.__uFontFactor += .05, apply(transpile(self.user)))],
            ['^-', (e) => (self.user.__uFontFactor -= .05, apply(transpile(self.user)))],
        );

        º.respond({
            "theme::val": (key) => val(key),
            "theme::px": (key) => px(key),
            "theme :as_px": (key) => as_px(key),
        });

        º.listen({
            "setting :themeUpdated": (theme) => {
                reset_theme();
                set_theme_to(theme);
                º.emit`article :advancedToken`(º.req`article :getActiveToken`());
            },
            "theme :repositionArticle": (article_node) => {
                const invert = () => (Math.random() > .5 ? 1 : -1);

                const main_padding = º.req`theme::px`("--main-padding");
                const {x, y, width: w, height: h} = ƒ("article").getBoundingClientRect();
                const ref = {
                    left: main_padding,
                    top: y + main_padding,
                    width: w - main_padding * 2,
                    height: h - main_padding * 2,
                };

                const article_base_width = º.req`theme :as_px`("--article-base-width");
                const article_width_shift = º.req`theme :as_px`("--article-width-shift");
                const article_base_height = º.req`theme :as_px`("--article-base-height");
                const article_height_shift = º.req`theme :as_px`("--article-height-shift");

                const width = Math.round(Math.min(
                    article_base_width +
                    Math.random() * (invert() * article_width_shift),
                    ref.width
                ));
                const height = Math.round(Math.min(
                    article_base_height +
                    Math.random() * (invert() * article_height_shift),
                    ref.height
                ));
                const left = Math.round(
                    (ref.width - width) / 2 +
                    (invert() * ((ref.width - width) / 2) * Math.random())
                );
                const top = Math.round(
                    (ref.height - height) / 2 +
                    (invert() * ((ref.height - height) / 2) * Math.random())
                );

                apply({
                    "--article-frame-x": `${ref.left + left}px`,
                    "--article-frame-y": `${ref.top + top}px`,
                    "--article-frame-width": `${width}px`,
                    "--article-frame-height": `${height}px`,
                });
            },
            "article :advancedToken": (node) => {
                const rect = node.getBoundingClientRect();
                apply({
                    "--k-article-token-x": `${node.offsetLeft}px`,
                    "--k-article-token-y": `${node.offsetTop}px`,
                    "--k-article-token-w": `${Math.round(rect.width)}px`,
                    "--k-article-token-h": `${Math.round(rect.height)}px`,
                });
            },
            "article :unloadArticle": () => {
                apply({ "--k-rand-article-bound": Math.random() });
            },
        });
    }();

    /// Returns the extended theme object.
    ///
    /// [>] name: string
    /// [<] object{*: str}
    function compile(name) {
        const theme = self.themes[name];
        const parent = theme.extend;

        if (!parent)
            return theme;

        return Object.assign(Object.create(null), compile(parent), theme);
    }

    function reset_theme() {
        Object.entries(compile(self.active_theme))
              .forEach(([key, value]) => self.node.style.removeProperty(key));
    }

    /// Sets the active theme to the given name and applies it.
    ///
    /// [>] name: str
    /// [<] void
    function set_theme_to(name) {
        apply(compile(self.active_theme = name));
    }

    /// Applies the given key value pairs to the html node.
    ///
    /// [>] vars: object{*: str}
    /// [<] void
    function apply(vars) {
        Object.entries(vars)
              .forEach(([key, value]) => self.node.style.setProperty(key, value));
   }

    /// Returns the raw property value as a string.
    ///
    /// [>] key: str
    /// [<] str
    function val(key) {
        return compile(self.active_theme)[key];
    }

    /// Returns the property as a number.
    ///
    /// [>] key: str
    /// [<] int
    function px(key) {
        return Number(val(key).replace(/px$/, String()));
    }

    /// Returns the property converted to an absolute pixel value.
    ///
    /// [>] key: str
    /// [<] int
    function as_px(key) {
        const [_, v, unit] = val(key).match(/(\d+)(.+)/);

        switch(unit) {
            case "px":
                return +v;
            case "vw":
                return window.innerWidth / 100 * +v;
            case "vh":
                return window.innerHeight / 100 * +v;
            default:
                throw Error(`Unkown unit '${unit}'.`);
        }
    }
}();