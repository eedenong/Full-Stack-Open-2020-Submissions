(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(13),c=t.n(r),l=(t(20),t(2)),s=t(14),u=t(3),i=t.n(u),m="/api/persons",d=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){console.log("response data from delete request is ",e.data)}))},b=function(e){return i.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return console.log("response data from edit is ",e.data),e.data}))},v=function(e){var n=e.persons,t=e.setPersons,o=e.newName,r=e.newNumber,c=e.setNewName,l=e.setNewNumber,u=e.setNotification,i=e.setError;return a.a.createElement("div",null,a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=function(){for(var e=!1,t=0;t<n.length;t++)n[t].name===o&&(e=!0);return e}(),m=function(){for(var e=!1,t=0;t<n.length;t++)n[t].number===r&&(e=!0);return e}();console.log("name exists: ",a),console.log("number exists: ",m);var d=a&&m;console.log("isDuplicate: ",d),d&&alert("".concat(o," is already added to phonebook"));var h=!a&&!m;console.log("isUnique: ",h),h&&function(){var e={name:o,number:r};console.log("new person created: ",e),f(e).then((function(e){console.log("post request response is ",e),t(n.concat(e)),c(""),l(""),u("Added ".concat(o)),setTimeout((function(){u(null)}),3e3)})).catch((function(e){var n=e.response.data;console.log(n),u(n.error),i(!0),setTimeout((function(){u(null),i(!1)}),5e3)})),console.log("person added to database"),console.log("persons list in addPerson is ",n)}(),!a&&m&&window.alert("Two people cannot have the same number!");var v=a&&!m;(console.log("change number: ",v),v)&&(window.confirm("".concat(o," is already added to phonebook, replace the old number with a new one?"))&&function(e){var a=Object(s.a)({},e,{number:r});console.log("newPerson created is ",a),b(a).then((function(e){console.log("put request response is ",e),c(""),l(""),t(n.map((function(n){return n.name===o?e:n}))),u("Edited ".concat(o,"'s number to ").concat(r)),setTimeout((function(){u(null)}),3e3)})).catch((function(e){var n=e.response.data;console.log(n),u(n.error),i(!0),setTimeout((function(){u(null),i(!1)}),5e3)}))}(n.find((function(e){return e.name===o}))))}},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:o,onChange:function(e){c(e.target.value)}})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:r,onChange:function(e){l(e.target.value)}})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add"))))},p=function(e){var n=e.newFilter,t=e.setFilterValue,o=e.showAll,r=e.setShowAll;return a.a.createElement("div",null,a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),r(!o)}},a.a.createElement("div",null,"filter shown with: ",a.a.createElement("input",{value:n,onChange:function(e){t(e.target.value)}}))))},w=function(e){var n=e.name,t=e.number,o=e.handleDelete;return a.a.createElement("div",null,n," ",t," ",a.a.createElement("button",{onClick:o},"delete"))},g=function(e){var n=e.persons,t=e.setPersons,o=e.showAll,r=e.newFilter,c=e.setError,l=e.setNotification,s=o?n:n.filter((function(e){var n=e.name.toLowerCase(),t=r.toLowerCase();return n.includes(t)})),u=function(e){return function(){if(console.log("person to be deleted: ",e.name),window.confirm("Delete ".concat(e.name," ?"))){var o=e.id;h(o).then((function(a){t(n.filter((function(e){return e.id!==o}))),l("".concat(e.name," deleted"))})).catch((function(a){t(n.filter((function(e){return e.id!==o}))),c(!0),l("".concat(e.name," has already been removed from the server")),setTimeout((function(){l(null),c(!1)}),3e3)}))}}};return a.a.createElement("div",null,0===s.length?"Cannot find any numbers with the current filter!":s.map((function(e){return a.a.createElement("div",{key:e.id},a.a.createElement(w,{name:e.name,number:e.number,id:e.id,handleDelete:u(e)}))})))},E=function(e){var n=e.message,t=e.isError;return null===n?null:t?a.a.createElement("div",{className:"error"},n):a.a.createElement("div",{className:"success"},n)},N=function(){var e=Object(o.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)(""),s=Object(l.a)(c,2),u=s[0],i=s[1],m=Object(o.useState)(""),f=Object(l.a)(m,2),h=f[0],b=f[1],w=Object(o.useState)(""),N=Object(l.a)(w,2),j=N[0],O=N[1],S=Object(o.useState)(!0),k=Object(l.a)(S,2),y=k[0],A=k[1],P=Object(o.useState)(null),C=Object(l.a)(P,2),D=C[0],F=C[1],T=Object(o.useState)(!1),q=Object(l.a)(T,2),x=q[0],B=q[1];return Object(o.useEffect)((function(){console.log("Getting list of persons from database"),d().then((function(e){console.log("returnedPersons is",e),r(e)}))}),[]),a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(E,{message:D,isError:x}),a.a.createElement(p,{newFilter:j,setFilterValue:O,showAll:y,setShowAll:A}),a.a.createElement("h2",null,"Add new number"),a.a.createElement(v,{persons:t,setPersons:r,newName:u,newNumber:h,setNewName:i,setNewNumber:b,setNotification:F,setError:B}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(g,{persons:t,setPersons:r,showAll:y,newFilter:j,setError:B,setNotification:F}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.da3da086.chunk.js.map