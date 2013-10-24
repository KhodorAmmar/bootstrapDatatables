$.extend(
    $.fn.dataTableExt.oStdClasses,
    {
        sSortAsc: "sorting sorting_asc",
        sSortDesc: "sorting sorting_desc",
        sSortable: "sorting"
    }),
$.fn.dataTableExt.oApi.fnPagingInfo =
    function (n) {
        return { iStart: n._iDisplayStart, iEnd: n.fnDisplayEnd(), iLength: n._iDisplayLength, iTotal: n.fnRecordsTotal(), iFilteredTotal: n.fnRecordsDisplay(), iPage: Math.ceil(n._iDisplayStart / n._iDisplayLength), iTotalPages: Math.ceil(n.fnRecordsDisplay() / n._iDisplayLength) }
    },
$.extend(
    $.fn.dataTableExt.oPagination,
    {
        bootstrap:
        {
            fnInit: function (n, t, i) {
                var u = n.oLanguage.oPaginate,
                    f = function (t) {
                        t.preventDefault(), n.oApi._fnPageChange(n, t.data.action) && i(n)
                    }, r;
                $(t).append('<ul class="pagination"><li class="disabled"><a href="#">&laquo;<\/a><\/li><li class="next disabled"><a href="#">&raquo;<\/a><\/li><\/ul>'), r = $("a", t), $(r[0]).bind("click.DT", { action: "previous" }, f), $(r[1]).bind("click.DT", { action: "next" }, f)
            },
            fnUpdate: function (n, t) {
                var e = 5, i =
                    n.oInstance.fnPagingInfo(),
                    u = n.aanFeatures.p, r, o, c,
                    f, s, h =
                        Math.floor(e / 2);
                for (i.iTotalPages < e ? (f = 1, s = i.iTotalPages) :
                    i.iPage <= h ? (f = 1, s = e) : i.iPage >= i.iTotalPages - h ?
                        (f = i.iTotalPages - e + 1, s = i.iTotalPages) :
                        (f = i.iPage - h + 1, s = f + e - 1), r = 0,
                iLen = u.length; r < iLen; r++) {
                    for ($("li:gt(0)", u[r]).filter(":not(:last)").remove(),
                    o = f; o <= s; o++)
                        c = o == i.iPage + 1 ? 'class="active"' : "",
                        $("<li " + c + '><a href="#">' + o + "<\/a><\/li>").insertBefore($("li:last", u[r])[0]).bind("click", function (r) { r.preventDefault(), n._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * i.iLength, t(n) });
                    i.iPage === 0 ? $("li:first", u[r]).addClass("disabled") : $("li:first", u[r]).removeClass("disabled"), i.iPage === i.iTotalPages - 1 || i.iTotalPages === 0 ? $("li:last", u[r]).addClass("disabled") : $("li:last", u[r]).removeClass("disabled");
                }
            }
        }
    });

(function ($) {
    var months = { "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12" };
    $.fn.dataTableExt.oSort['date-ka-asc'] = function (a, b) {
        var as = a.split(" "), bs = b.split(" ");
        var x = new Date(as[2], months[as[1]], as[0]), y = new Date(bs[2], months[bs[1]], bs[0]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    };
    $.fn.dataTableExt.oSort['date-ka-desc'] = function (a, b) {
        var as = a.split(" "), bs = b.split(" ");
        var x = new Date(as[2], months[as[1]], as[0]), y = new Date(bs[2], months[bs[1]], bs[0]);
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    };
    $.fn.extend({
        toDataTable: function () {
            return $(this).dataTable({
                "sDom": "<<'col-lg6'l><'col-lg6'f>r>t<<'col-lg6'i><'col-lg6'p>>",
                "sPaginationType": "bootstrap",
                "bLengthChange": false,
                'iDisplayLength': 10,
                "bFilter": true,
                "bInfo": false,
                "bDestroy": true,
                "bAutoWidth": false,
                "aoColumnDefs": [{
                    'bSortable': false,
                    'bSearchable': false,
                    'aTargets': ['unsortable']
                }, {
                    'bSortable': false,
                    'aTargets': ['nosortonly']
                }, {
                    'sType': 'date-ka',
                    'aTargets': ['date']
                }, {
                    'bVisible': false,
                    'aTargets': ['unvisible']
                }],
                "fnDrawCallback": function (oSettings) {
                    if (oSettings._iDisplayLength > oSettings.fnRecordsDisplay()) {
                        $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                    }
                }
            });
        }
    });
})(jQuery);
