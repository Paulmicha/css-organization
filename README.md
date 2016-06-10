
CSS organization
================

[WIP] This is an example of CSS organization using PostCSS.

## Tools
- [Gulp](http://gulpjs.com/)
- [cssnext](http://cssnext.io/) (collection of [postcss](https://github.com/postcss/postcss) plugins)


## Installation
```
npm install
```


## Usage
```
cd /path/to/docroot

# Watch (default Gulp task)
gulp
```

## Principles

Some fundamentals from @necolas's [HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/) - namely : preference to use the "multi-class" pattern, more scalable.

Most importantly : [CSS Guidelines](http://cssguidelin.es/) - sections _Architectural Principles_, _CSS Selectors_, and _Specificity_ : use @csswizardry's methodology - [applying traditional software engineering to CSS](https://speakerdeck.com/csswizardry/css-for-software-engineers-for-css-developers) (see also this [video conference](https://vimeo.com/140641366)).

Very quick overview notes :
- DRY / Single Source of truth - warnings : don't DRY if it's repeated coincidentally, just avoid duplicating data in source (repetition in compiled code is fine).
- Single Responsability (context encapsulation, composability) : do one thing, and one thing well - break into individual concerns.
- Separation of concerns - notably : don't bind JS onto CSS classes
- Immutability - the only time to use !important
- Open/Closed principle : never change anything at its source, always make change via extension - possibly the most useful principle for dealing with other people's code.
- Orthogonality : avoid collisions - ex: using proper scoping
- Moustache Principle : just because you can, it doesn't mean you should.


## Structure
Here are suggestions for organizaing CSS files. This section will be updated to elaborate on different approaches (because a single generic architecture may not always be the most appropriate for projects of different size or nature).

### Centralized, Single CSS folder
```
path/to/project/
    └── css/
        ├── base/           <- 1
        │   └── ...
        ├── generic/        <- 2
        │   └── ...
        ├── specific/       <- 3
        │   └── ...
        ├── node_modules/   <- (gitignored deps)
        │   └── ...
        ├── index.css       <- Input (compilation entry point)
        ├── main.css        <- Output (compiled result)
        └── critical.css    <- 4
```

### Modular, Component-oriented, Self-contained Structure
Similar to [eCSS file organization (ch.5)](http://ecss.io/chapter5.html), inspired by [@necolas's talk](https://www.youtube.com/watch?v=m0oMHG6ZXvo).
```
path/to/project/
    └── modules/
        ├── base/               <- 1
        │   ├── node_modules/   <- (gitignored deps)
        │   │   ├── sanitize.css
        │   │   └── ...
        │   └── my_component    <- custom component
        │       ├── css/
        │       │   └── ...
        │       ├── js/
        │       └── ...
        ├── generic/            <- 2
        │   ├── node_modules/   <- (gitignored deps)
        │   └── my_component    <- custom component
        │       ├── css/
        │       │   └── ...
        │       ├── js/
        │       └── ...
        ├── specific/           <- 3
        │   └── my_component    <- custom component
        │       ├── css/
        │       │   └── ...
        │       ├── js/
        │       └── ...
        ├── critical.css        <- 4
        ├── main.css            <- Output (compiled result)
        ├── main.js
        └── ...
```

### 1. `base/` : Bare HTML tags & global declarations
This corresponds to the original [SMACSS category](http://snook.ca/archives/html_and_css/avoid-overstyling-base-styles) of the same name.

File naming : use categories from [Josh Duck’s HTML Periodic Table](http://smm.zoomquiet.io/data/20110511083224/index.html) ([Screenshot](http://bradfrost.com/wp-content/uploads/2012/11/Screen-Shot-2012-11-13-at-5.15.05-PM.png)) + [optional] use double extension `.vas.css` for files containing "low-level" variables.

Additional considerations :
- @jonathantneal's [Sanitize.css](https://github.com/10up/sanitize.css) or @necolas's [Normalize](https://github.com/necolas/normalize.css/)
- @mrmrs_'s [tachyons-box-sizing](https://github.com/tachyons-css/tachyons-box-sizing)
- Bits and pieces to adapt from @paulrobertlloyd's [Barebones](https://github.com/paulrobertlloyd/barebones)

Note : some base styles can be specific to the current project (typographic settings, default tags appearance, etc).

#### Terminology / Designation
@bradfrost's terminology : **Atoms** / proposed alternative (common designation) : **Elements**

### 2. `generic/` : Immutable Utilities, Objects, Components
Styles with potential for reuse. Ideally, these should be included as third-party / vendor components (e.g. `node_modules`), but sometimes we need a place to start something reusable outside of the other folders.

Important consideration : look at what [CSS Modules](https://github.com/css-modules) are doing for this.

Examples of styles belonging in this category :
- SUIT CSS [components-flex-embed](https://github.com/suitcss/components-flex-embed), [components-arrange](https://github.com/suitcss/components-arrange), etc.
- @mrmrs_'s [colors](https://github.com/mrmrs/colors)
- Any individual or isolated unit of styles that can be reused from other frameworks ([InuitCSS](https://github.com/inuitcss), [Material Design Lite Components](https://github.com/google/material-design-lite), [PureCSS](http://purecss.io/), [BassCSS](http://www.basscss.com/), or even some [Zurb Foundation](https://github.com/zurb/foundation-sites) and [Bootstrap](https://github.com/twbs/bootstrap/) components)

#### Terminology / Designation
@bradfrost's terminology : usually **Molecules**, maybe even **Organisms** / proposed alternatives (common designation) : **Components**, **Objects**, **Utilities**

### 3. `specific/` : Current Project Styles
Low potential for reuse, but these styles shouldn't necessarily be unstructured either.
Within that folder, the organization should accomodate the size of the current project, and/or personal preference - ex : transposing @HugoGiraudel's [Architecture for a Sass Project](http://www.sitepoint.com/architecture-sass-project/)
Examples :
- Variables overrides (media queries values, objects and utilities customizations, etc.)
- Variations, extensions of objects ("specialization" of generic styles)
- *Theme* modifiers (as in @csswizardry's namespace terminology)
- Custom components

#### Terminology / Designation
@bradfrost's terminology : should mostly relate to **Organisms**, **Templates** and **Pages**, but could also include lower-level styles like **Molecules**  / proposed alternatives (common designation) : same as • 2. `generic/` + **Scopes**, **Compositions**.


### 4. `critical.css`
Experimental / to discuss :
This file is the result of a separate compilation, taking any CSS file ending with `.critical.css` (double extension), and optionally (TODO : compilation options) folders like `base/` or `generic/` (as the main layout and typography are usually abstracted - like grids, widths, box-model measures or scales).
Alternative tool to generate this file : @filamentgroup's [criticalCSS](https://github.com/filamentgroup/criticalCSS)
More info :
- @adactio's [Inlining critical CSS for first-time visits](https://adactio.com/journal/8504)
- @filamentgroup's [How we make RWD sites load fast as heck](https://www.filamentgroup.com/lab/performance-rwd.html)
- @chriscoyier's [Authoring Critical Above-the-Fold CSS](https://css-tricks.com/authoring-critical-fold-css/)


## CSS Coding Style and Naming Conventions
- All imported CSS files should have the `_` prefix in their filename.
- File naming convention may also follow [InuitCSS's file naming conventions](https://github.com/inuitcss/getting-started) or [ITCSS](http://itcss.io/) ([Inverted Triangle](http://www.creativebloq.com/web-design/manage-large-scale-web-projects-new-css-architecture-itcss-41514731/2) metaphore - see [example](https://github.com/itcss/itcss-netmag/tree/master/css)).
- Selectors may use ANY of the following conventions : @csswizardry's [Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) (see [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) and @DaveOrDead's [Additional Tips](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)), [SUIT CSS naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md), [Enduring CSS (eCSS)](http://ecss.io/), [Tapestry](https://github.com/Wisembly/tapestry)... as long as it helps enforcing the principles outlined in the methodology.
- Additional BEMIT namespaces (custom class prefixes) suggestions :
    - `fx-` : effects or interactions
    - `b-` : box-model utilities : borders
    - `m-` : box-model utilities : margins
    - `p-` : box-model utilities : paddings
- (to discuss) Double extension `.critical.css` for separate inline "critical" CSS compilation ?
- Encourage [Meaningful Whitespace](http://cssguidelin.es/#meaningful-whitespace)
- Components :
    - Consider additional namespace by vendor/author for portability (e.g. `fx-paulmicha-foobar`)
    - And/or implement dynamic prefixes with tools like [postcss-class-prefix](https://github.com/thompsongl/postcss-class-prefix) or [CSS Modules](https://github.com/css-modules/css-modules)
- T-shirt sizes : common suffixes to indicate size or magnitude. Example :

in file `_typography.vars.css` :
```

/**
 *  Typography CSS vars declarations.
 *
 *  1. Anything from 45 to 75 characters is widely regarded as a satisfactory
 *    length of line for a single-column page set in a serifed text face in a
 *    text size.
 *    The 66-character line (counting both letters and spaces) is widely
 *    regarded as ideal.
 *    For multiple column work, a better average is 40 to 50 characters.
 *    See http://webtypography.net/2.1.2
 *
 *  2. Letter-spacing values are not meant for lowercase text.
 *    See http://practicaltypography.com/letterspacing.html
 */

:root {
    --w-typo-ratio: 33; /* 1 */
    --w-typo-ratio-l: 50;

    --font-size-ratio: 1;
    --font-size: calc(var(--font-size-ratio) * 16);
    --line-height: 1.4;

    --font-family: 'Raleway', sans-serif;
    --font-weight: 500;
    --font-weight-bold: 700;
    --font-weight-light: 400;
    --font-weight-thin: 200;

    --letter-spacing: .1em; /* 2 */
    --letter-spacing-m: .2em; /* 2 */
    --letter-spacing-l: .25em; /* 2 */


    /*  T-shirt sizes presets : XS < S < base < M < L < XL < XXL
        Expansion examples :
        XXS < XS < S < base < MS < M < ML < MLL < L < LL < LLL < XL < XLL < XXL < XXXL
    */

    --font-size-ratio-xs: .7;
    --font-size-xs: calc(var(--font-size) * var(--font-size-ratio-xs));
    --line-height-xs: 1.2;

    --font-size-ratio-s: .8;
    --font-size-s: calc(var(--font-size) * var(--font-size-ratio-s));
    --line-height-s: 1.2;

    --font-size-ratio-m: 1.25;
    --font-size-m: calc(var(--font-size) * var(--font-size-ratio-m));
    --line-height-m: var(--line-height);

    --font-size-ratio-l: 1.5;
    --font-size-l: calc(var(--font-size) * var(--font-size-ratio-l));
    --line-height-l: var(--line-height);

    --font-size-ratio-ll: 2.15;
    --font-size-ll: calc(var(--font-size) * var(--font-size-ratio-ll));
    --line-height-ll: 1.33;

    --font-size-ratio-xl: 2.5;
    --font-size-xl: calc(var(--font-size) * var(--font-size-ratio-xl));
    --line-height-xl: 1.25;

    --font-size-ratio-xll: 3;
    --font-size-xll: calc(var(--font-size) * var(--font-size-ratio-xll));
    --line-height-xll: 1.2;

    --font-size-ratio-xxl: 4;
    --font-size-xxl: calc(var(--font-size) * var(--font-size-ratio-xxl));
    --line-height-xxl: 1.1;
}
```

- Color variable aliases : allows for safer ulterior modifications, by separating declaration (changing value) from application (changing usage). Example :

in file `_colors.vars.css` :
```
:root {
    --color-1: #004281;
    --color-2: #f25921;
    --color-3: #d71920;

    --color-grey-1: #151515;
    --color-grey-2: #DDD;
    --color-grey-3: #292929;

    --color-grey-t-1: rgba(28, 28, 28, .88);
    --color-grey-t-2: rgba(41, 41, 41, .88);
    --color-grey-t-3: rgba(75, 75, 75, .88);

    --color-black-t-1: rgba(0, 0, 0, .5);
    --color-black-t-2: rgba(0, 0, 0, .8);
    --color-black-t-3: rgba(0, 0, 0, .05);

    --color-white-t-1: rgba(255, 255, 255, .5);
    --color-white-t-2: rgba(255, 255, 255, .1);
}
```

in file `_root.css` :
```
:root {
    --html-bg-color: var(--color-1);
    --text-color: white;
    --text-color-inverse: var(--color-grey-4);
}
```

On colors, see also [clrs.cc](http://clrs.cc/) and [accessible color combinations (contrasts) examples](http://clrs.cc/a11y/).

## Linting

The choice not to enforce any particular selectors naming convention does not necessarily mean linting can't be done : it could test for obvious violations of the principles of the methodology (TODO : list a few implementations that could be combined without conflict).

It's worth noting that CSS Modules seem to have a similar stance : [*"For local class names camelCase naming is recommended, but not enforced."*](https://github.com/css-modules/css-modules)


## Regression Testing

Here are a few tools that got my attention over the last few years :
- [BackstopJS](https://css-tricks.com/automating-css-regression-testing/)
- [Shoov.io](http://www.gizra.com/content/shoov-ui-regression/)
- [Spectre](https://medium.com/friday-people/how-we-do-visual-regression-testing-af63fa8b8eb1)

TODO : summarize quick setup instructions here.
