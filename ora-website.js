var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare
    .goto('http://www.umd.edu')
    .screenshot('ora1.png')
    .click('html.js.gr__umd_edu body div#site_container div#body_container div#body_container_no_padding div.row.row2 div.column.col1 table#hot_topics tbody tr td h4 a')
    .wait(1000)
    .screenshot('ora2.png')
    .click('html.js.gr__umdrightnow_umd_edu body.html.not-front.not-logged-in.no-sidebars.page-node.page-node-.page-node-11956.node-type-news.omega-mediaqueries-processed.umdheader-processed.responsive-layout-normal div#page.page section#section-content.section.section-content div#zone-content-wrapper.zone-wrapper.zone-content-wrapper.clearfix div#zone-content.zone.zone-content.clearfix.container-12 div#region-content.grid-8.region.region-content div.region-inner.region-content-inner div#block-system-main.block.block-system div.block-inner.clearfix div.content.clearfix article#node-news-11956.node.node-news.node-sticky div.content.clearfix div.field.field-name-body.field-type-text-with-summary.field-label-hidden div.field-items div.field-item.even p a')
    .wait('#skip-link')
    .screenshot('ora3.png')    
    
    
      .end()
  .screenshot('orafinal.png')
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('error message when running this nightmare script:', error);
  });