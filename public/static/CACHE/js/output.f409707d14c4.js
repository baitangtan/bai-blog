function getCookie(name){let cookieValue=null;if(document.cookie&&document.cookie!==''){const cookies=document.cookie.split(';');for(let i=0;i<cookies.length;i++){const cookie=cookies[i].trim();if(cookie.substring(0,name.length+1)===(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}
const loginStateCache={promise:null,value:null,initialized:true};async function isLogin(options={}){return true;}
function clearLoginStateCache(){};const messageModule=(()=>{let overlay=null;let messageBox=null;let titleElement=null;let contentElement=null;let iframeElement=null;let iframeContainer=null;let closeButton=null;let buttonContainer=null;let cancelButton=null;let confirmButton=null;let toastContainer=null;let autoCloseTimer=null;let currentCallbacks={onConfirm:null,onCancel:null};let currentTarget=null;let isPopoverMode=false;function createOverlay(){overlay=document.createElement('div');overlay.className='message-overlay';overlay.addEventListener('click',function(e){if(e.target===overlay){hide();}});document.body.appendChild(overlay);}
function createMessageBox(){messageBox=document.createElement('div');messageBox.className='message';closeButton=document.createElement('div');closeButton.className='message-close-btn';closeButton.innerHTML='✕';closeButton.addEventListener('click',hide);titleElement=document.createElement('div');titleElement.className='message-title';contentElement=document.createElement('div');contentElement.className='message-content';iframeContainer=document.createElement('div');iframeContainer.className='message-iframe-container';iframeElement=document.createElement('iframe');iframeElement.id='message-iframe';iframeElement.className='message-iframe';iframeContainer.appendChild(iframeElement);buttonContainer=document.createElement('div');buttonContainer.className='message-btn';cancelButton=document.createElement('button');cancelButton.className='btn btn-secondary message-btn-cancel';cancelButton.addEventListener('click',function(){const callback=currentCallbacks.onCancel;hide();if(callback){callback();}});confirmButton=document.createElement('button');confirmButton.className='btn btn-primary message-btn-confirm';confirmButton.addEventListener('click',function(){const callback=currentCallbacks.onConfirm;hide();if(callback){callback();}});buttonContainer.appendChild(cancelButton);buttonContainer.appendChild(confirmButton);messageBox.appendChild(closeButton);messageBox.appendChild(titleElement);messageBox.appendChild(contentElement);messageBox.appendChild(iframeContainer);messageBox.appendChild(buttonContainer);document.body.appendChild(messageBox);}
function createToastContainer(){toastContainer=document.createElement('div');toastContainer.className='toast-container toast-top';document.body.appendChild(toastContainer);}
function init(){if(!overlay)createOverlay();if(!messageBox)createMessageBox();if(!toastContainer)createToastContainer();}
function showElement(element){if(element){element.style.display='';element.classList.remove('hide');}}
function hideElement(element){if(element){element.classList.add('hide');}}
function getTargetElement(target){if(!target)return null;if(typeof target==='string'){return document.querySelector(target);}
return target;}
function calculatePosition(targetElement,position,offset){const targetRect=targetElement.getBoundingClientRect();const viewportWidth=window.innerWidth;const viewportHeight=window.innerHeight;let finalPosition=position;let top,left;if(position==='auto'){const spaceTop=targetRect.top;const spaceBottom=viewportHeight-targetRect.bottom;const spaceLeft=targetRect.left;const spaceRight=viewportWidth-targetRect.right;const maxVerticalSpace=Math.max(spaceTop,spaceBottom);const maxHorizontalSpace=Math.max(spaceLeft,spaceRight);if(maxVerticalSpace>=maxHorizontalSpace){finalPosition=spaceTop>=spaceBottom?'top':'bottom';}else{finalPosition=spaceLeft>=spaceRight?'left':'right';}}
messageBox.offsetHeight;const rect=messageBox.getBoundingClientRect();const messageWidth=rect.width;const messageHeight=rect.height;switch(finalPosition){case'top':top=targetRect.top-messageHeight-offset;left=targetRect.left+(targetRect.width-messageWidth)/2;break;case'bottom':top=targetRect.bottom+offset;left=targetRect.left+(targetRect.width-messageWidth)/2;break;case'left':top=targetRect.top+(targetRect.height-messageHeight)/2;left=targetRect.left-messageWidth-offset;break;case'right':top=targetRect.top+(targetRect.height-messageHeight)/2;left=targetRect.right+offset;break;}
const padding=10;if(left<padding){left=padding;}else if(left+messageWidth>viewportWidth-padding){left=viewportWidth-messageWidth-padding;}
if(top<padding){top=padding;}else if(top+messageHeight>viewportHeight-padding){top=viewportHeight-messageHeight-padding;}
return{top,left};}
function positionNearTarget(targetElement,position,offset){messageBox.style.transform='none';messageBox.style.margin='0';messageBox.style.position='fixed';messageBox.offsetHeight;const pos=calculatePosition(targetElement,position,offset);messageBox.style.top=pos.top+'px';messageBox.style.left=pos.left+'px';}
function show(options){init();const config=typeof options==='string'?{content:options}:(options||{});if(autoCloseTimer){clearTimeout(autoCloseTimer);autoCloseTimer=null;}
const settings={title:config.title||'',content:config.content||'',showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',cancelText:config.cancelText||'取消',onConfirm:config.onConfirm||null,onCancel:config.onCancel||null,autoClose:config.autoClose||0,isHtml:config.isHtml===true,url:config.url||'',iframeHeight:config.iframeHeight||'500px',iframeWidth:config.iframeWidth||'100%',target:config.target||null,position:config.position||'auto',offset:config.offset||10,customButtons:config.customButtons||null};currentTarget=getTargetElement(settings.target);isPopoverMode=currentTarget!==null;currentCallbacks.onConfirm=settings.onConfirm;currentCallbacks.onCancel=settings.onCancel;if(settings.title){titleElement.textContent=settings.title;showElement(titleElement);}else{hideElement(titleElement);}
if(settings.url){hideElement(contentElement);showElement(iframeContainer);iframeElement.src=settings.url;iframeElement.style.height=settings.iframeHeight;iframeElement.style.width=settings.iframeWidth;}else{hideElement(iframeContainer);showElement(contentElement);if(settings.isHtml){contentElement.innerHTML=settings.content;}else{contentElement.textContent=settings.content;}}
if(settings.showClose){showElement(closeButton);}else{hideElement(closeButton);}
if(settings.customButtons&&Array.isArray(settings.customButtons)){buttonContainer.innerHTML='';settings.customButtons.forEach(function(btnConfig){const btn=document.createElement('button');btn.textContent=btnConfig.text;btn.className='btn '+(btnConfig.class||'btn-primary');btn.addEventListener('click',function(){const callback=btnConfig.onClick;hide();if(callback){callback();}});buttonContainer.appendChild(btn);});}else{buttonContainer.innerHTML='';buttonContainer.appendChild(cancelButton);buttonContainer.appendChild(confirmButton);cancelButton.textContent=settings.cancelText;confirmButton.textContent=settings.confirmText;if(settings.showCancel){showElement(cancelButton);}else{hideElement(cancelButton);}}
if(isPopoverMode){hideElement(overlay);messageBox.classList.remove('show');messageBox.classList.add('message-popover');messageBox.style.visibility='hidden';messageBox.style.display='block';messageBox.classList.add('show');requestAnimationFrame(function(){positionNearTarget(currentTarget,settings.position,settings.offset);messageBox.style.visibility='';});}else{messageBox.classList.remove('message-popover');messageBox.style.position='';messageBox.style.top='';messageBox.style.left='';messageBox.style.transform='';messageBox.style.margin='';messageBox.style.visibility='';overlay.classList.add('show');messageBox.classList.add('show');}
if(settings.autoClose>0){autoCloseTimer=setTimeout(hide,settings.autoClose);}}
function hide(){if(autoCloseTimer){clearTimeout(autoCloseTimer);autoCloseTimer=null;}
if(overlay)overlay.classList.remove('show');if(messageBox){messageBox.classList.remove('show');messageBox.style.display='';}
if(iframeElement)iframeElement.src='';currentCallbacks={onConfirm:null,onCancel:null};}
function confirm(options){return new Promise(function(resolve){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'确认',content:config.content,showCancel:true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',cancelText:config.cancelText||'取消',isHtml:config.isHtml,onConfirm:function(){resolve(true);if(config.onConfirm)config.onConfirm();},onCancel:function(){resolve(false);if(config.onCancel)config.onCancel();}});});}
function toast(options){init();const config=typeof options==='string'?{content:options}:(options||{});const settings={content:config.content||'',type:config.type||'info',duration:config.duration||3000,position:config.position||'top',isHtml:config.isHtml===true};const iconMap={success:'✓',error:'✕',warning:'⚠',info:'ℹ'};const toastElement=document.createElement('div');toastElement.className='toast-message toast-'+settings.type;const iconDiv=document.createElement('div');iconDiv.className='toast-icon';iconDiv.textContent=iconMap[settings.type]||iconMap.info;const contentDiv=document.createElement('div');contentDiv.className='toast-content';if(settings.isHtml){contentDiv.innerHTML=settings.content;}else{contentDiv.textContent=settings.content;}
toastElement.appendChild(iconDiv);toastElement.appendChild(contentDiv);if(settings.position==='bottom'){toastContainer.className='toast-container toast-bottom';}else{toastContainer.className='toast-container toast-top';}
toastContainer.appendChild(toastElement);setTimeout(function(){toastElement.classList.add('show');},10);setTimeout(function(){toastElement.classList.remove('show');setTimeout(function(){if(toastElement.parentNode){toastElement.parentNode.removeChild(toastElement);}},300);},settings.duration);}
function success(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'成功',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
function warning(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'警告',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',cancelText:config.cancelText||'取消',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
function error(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'错误',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
function info(options){const config=typeof options==='string'?{content:options}:(options||{});show({title:config.title||'提示',content:config.content,showCancel:config.showCancel===true,showClose:config.showClose!==false,confirmText:config.confirmText||'确定',isHtml:config.isHtml,onConfirm:config.onConfirm,onCancel:config.onCancel,autoClose:config.autoClose});}
return{show:show,hide:hide,confirm:confirm,toast:toast,success:success,warning:warning,error:error,info:info};})();;(()=>{const THEME_KEY='theme';const THEME_LIGHT='light';const THEME_DARK='dark';const themeButton=document.getElementById('theme-btn');function initTheme(){const savedTheme=localStorage.getItem(THEME_KEY);const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;const theme=savedTheme||(prefersDark?THEME_DARK:THEME_LIGHT);applyTheme(theme);notifyIframesAboutTheme(theme);}
function applyTheme(theme){const root=document.documentElement;root.classList.remove('light','dark');if(theme===THEME_DARK){root.classList.add('dark');}else{root.classList.add('light');}
localStorage.setItem(THEME_KEY,theme);notifyIframesAboutTheme(theme);}
function notifyIframesAboutTheme(theme){const iframes=document.querySelectorAll('iframe');iframes.forEach(iframe=>{try{if(iframe.contentWindow){iframe.contentWindow.postMessage({type:'THEME_CHANGE',theme:theme,timestamp:Date.now()},'*');}}catch(error){console.warn('无法向iframe发送主题消息:',error);fallbackToURLTheme(iframe,theme);}});}
function fallbackToURLTheme(iframe,theme){try{const currentSrc=iframe.src.split('?')[0];iframe.src=`${currentSrc}?theme=${theme}&t=${Date.now()}`;}catch(error){console.error('URL主题设置也失败:',error);}}
function toggleTheme(){const root=document.documentElement;const isDark=root.classList.contains('dark');const newTheme=isDark?THEME_LIGHT:THEME_DARK;applyTheme(newTheme);root.style.transition='background-color 0.3s ease, color 0.3s ease';setTimeout(()=>{root.style.transition='';},300);}
function setupIframeListeners(){document.addEventListener('DOMContentLoaded',function(){const iframes=document.querySelectorAll('iframe');iframes.forEach(iframe=>{iframe.addEventListener('load',function(){const currentTheme=localStorage.getItem(THEME_KEY)||THEME_DARK;setTimeout(()=>{notifyIframesAboutTheme(currentTheme);},100);});});});}
function watchSystemTheme(){const mediaQuery=window.matchMedia('(prefers-color-scheme: dark)');mediaQuery.addEventListener('change',(e)=>{const savedTheme=localStorage.getItem(THEME_KEY);if(!savedTheme){const theme=e.matches?THEME_DARK:THEME_LIGHT;applyTheme(theme);}});}
function setupMessageListener(){window.addEventListener('message',function(event){const data=event.data;if(data&&data.type==='THEME_REQUEST'){const currentTheme=localStorage.getItem(THEME_KEY)||THEME_DARK;const sourceWindow=getIframeSourceWindow(event.source);if(sourceWindow){sourceWindow.postMessage({type:'THEME_RESPONSE',theme:currentTheme,timestamp:Date.now()},event.origin);}}});}
function getIframeSourceWindow(source){if(!source){return null;}
const iframes=document.querySelectorAll('iframe');for(const iframe of iframes){if(iframe.contentWindow===source){return iframe.contentWindow;}}
return null;}
function bindEvents(){if(themeButton){themeButton.addEventListener('click',toggleTheme);}}
function init(){initTheme();bindEvents();watchSystemTheme();setupIframeListeners();setupMessageListener();}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}})();;(()=>{let announcementCount=0;let allAnnouncements=[];let currentAnnouncementIndex=0;let isCurrentUserLoggedIn=false;let noticeContainer;let noticeOverlay;let noticeCloseBtn;let announcementTitle;let announcementStatus;let announcementTime;let announcementContent;let announcementIndicators;let prevButton;let nextButton;document.addEventListener('DOMContentLoaded',init);async function init(){createNoticeContainer();initDOMElements();bindEvents();isCurrentUserLoggedIn=await isLogin();await startNotifications();}
function createNoticeContainer(){if(document.getElementById('notice-container')){return;}
const noticeHTML=`
            <div class="notice-container" id="notice-container">
                <div class="notice-overlay" id="notice-overlay"></div>
                <div class="notice-content">
                    <div class="notice-header">
                        <h2 class="notice-title">公告</h2>
                        <div class="notice-close-btn" id="notice-close-btn">✕</div>
                    </div>
                    <!-- 公告展示区域 -->
                    <div class="announcement-display">
                        <!-- 标题区域 -->
                        <div class="announcement-header">
                            <h3 id="announcement-title">加载中...</h3>
                            <div class="announcement-meta">
                                <span id="announcement-status" class="status-badge">未读</span>
                                <span id="announcement-time" class="time-badge">发布时间：--</span>
                            </div>
                        </div>
                        <!-- 正文区域 -->
                        <div id="announcement-content" class="announcement-content">
                            加载中...
                        </div>
                        <!-- 指示器和按钮区域 -->
                        <div class="announcement-controls">
                            <!-- 公告数量指示器 -->
                            <div id="announcement-indicators" class="announcement-indicators">
                                <!-- 指示点将通过JS动态生成 -->
                            </div>
                            <!-- 导航按钮 -->
                            <div class="announcement-nav-buttons">
                                <button id="prev-announcement" class="nav-button">上一条</button>
                                <button id="next-announcement" class="nav-button">下一条</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML('beforeend',noticeHTML);}
function initDOMElements(){noticeContainer=document.getElementById('notice-container');noticeOverlay=document.getElementById('notice-overlay');noticeCloseBtn=document.getElementById('notice-close-btn');announcementTitle=document.getElementById('announcement-title');announcementStatus=document.getElementById('announcement-status');announcementTime=document.getElementById('announcement-time');announcementContent=document.getElementById('announcement-content');announcementIndicators=document.getElementById('announcement-indicators');prevButton=document.getElementById('prev-announcement');nextButton=document.getElementById('next-announcement');}
function bindEvents(){document.getElementById('notice-btn').addEventListener('click',showAnnouncementsWindow);if(noticeCloseBtn){noticeCloseBtn.addEventListener('click',closeAnnouncementsWindow);}
if(noticeOverlay){noticeOverlay.addEventListener('click',closeAnnouncementsWindow);}
if(prevButton){prevButton.addEventListener('click',async()=>{if(currentAnnouncementIndex>0){await displayAnnouncement(currentAnnouncementIndex-1,isCurrentUserLoggedIn);}});}
if(nextButton){nextButton.addEventListener('click',async()=>{if(currentAnnouncementIndex<allAnnouncements.length-1){await displayAnnouncement(currentAnnouncementIndex+1,isCurrentUserLoggedIn);}});}}
async function startNotifications(){}
async function getNotifications(){return{has_unread:false,unread_count:0};}function updateBadge(count){const badge=document.getElementById('badge');if(badge&&count>0){badge.classList.add('show');badge.textContent=String(count);}}
async function showAnnouncementsWindow(){if(noticeContainer){noticeContainer.classList.add('show');}
await loadAnnouncementData();}
function closeAnnouncementsWindow(){if(noticeContainer){noticeContainer.classList.remove('show');}}
async function loadAnnouncementData(){try{if(announcementContent){announcementContent.innerHTML='<div class="loading-message">加载中...</div>';}
const response=await fetch('/notice/api/announcements/');const data=await response.json();if(data.success&&data['announcements'].length>0){allAnnouncements=data['announcements'];createAnnouncementIndicators(allAnnouncements.length);await displayAnnouncement(0,isCurrentUserLoggedIn);}else{if(announcementContent){announcementContent.innerHTML='<div class="error-message">暂无公告</div>';}}}catch(error){messageModule.error({content:`加载公告失败:${error}`,});if(announcementContent){announcementContent.innerHTML='<div class="error-message">加载失败，请稍后重试</div>';}}}
function createAnnouncementIndicators(count){if(!announcementIndicators)return;announcementIndicators.innerHTML='';for(let i=0;i<count;i++){const dot=document.createElement('div');dot.className='indicator-dot';dot.setAttribute('data-index',String(i));dot.addEventListener('click',async function(){const index=parseInt(this.getAttribute('data-index'));await displayAnnouncement(index,isCurrentUserLoggedIn);});announcementIndicators.appendChild(dot);}
if(count>0){announcementIndicators.children[0].classList.add('active');}}
async function displayAnnouncement(index,isLoggedIn=false){if(index<0||index>=allAnnouncements.length){return;}
const announcement=allAnnouncements[index];currentAnnouncementIndex=index;if(announcementTitle){announcementTitle.textContent=announcement.title;}
if(announcementStatus){if(announcement.is_read){announcementStatus.textContent='已读';announcementStatus.classList.add('read');}else{announcementStatus.textContent='未读';announcementStatus.classList.remove('read');}}
if(announcementTime){announcementTime.textContent=`发布时间：${announcement['publish_time']}`;}
if(announcementContent&&typeof marked!=='undefined'){announcementContent.innerHTML=marked.parse(announcement.content);}else if(announcementContent){announcementContent.textContent=announcement.content;}
if(!announcement.is_read&&isLoggedIn){await markAnnouncementAsRead(announcement.id);}
updateIndicators(index);updateNavigationButtons();}
function updateIndicators(activeIndex){if(!announcementIndicators)return;const dots=announcementIndicators.querySelectorAll('.indicator-dot');dots.forEach((dot,index)=>{if(index===activeIndex){dot.classList.add('active');}else{dot.classList.remove('active');}});}
function updateNavigationButtons(){if(prevButton){prevButton.disabled=currentAnnouncementIndex<=0;}
if(nextButton){nextButton.disabled=currentAnnouncementIndex>=allAnnouncements.length-1;}}
async function markAnnouncementAsRead(announcementId){try{const response=await fetch('/notice/api/mark-announcement-read/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify({announcement_id:announcementId}),credentials:'same-origin'});const data=await response.json();if(data.success){updateAnnouncementReadStatus(announcementId);await startNotifications();}}catch(error){console.error('标记公告已读失败:',error);}}
function updateAnnouncementReadStatus(announcementId){for(let i=0;i<allAnnouncements.length;i++){if(allAnnouncements[i].id===announcementId){allAnnouncements[i].is_read=true;break;}}}})();;(()=>{const DRAWER_MENU_TIP_KEY='drawer_menu_tip_seen';const DRAWER_MENU_TIP_VERSION='2026-05-drawer-menu-v1';const DESKTOP_MEDIA_QUERY='(min-width: 769px)';const DRAWER_MENU_TIP_DELAY=1000;document.addEventListener('DOMContentLoaded',initMenu);async function initMenu(){const isLoggedIn=await isLogin();document.getElementById(isLoggedIn?'login-menu':'logout-menu').classList.add('show');setupOverlayClickListener();setupEscCloseListener();bindMenuArea();setupDrawerMenuTip();if(isLoggedIn){document.querySelector('#login-menu .user-name')?.addEventListener('click',toggleLoginMenu);}}
function toggleLoginMenu(event){if(event){event.stopPropagation();}
const loginDropdownContent=document.getElementById('login-dropdown-content');if(!loginDropdownContent){return;}
if(loginDropdownContent.classList.contains('show')){closeAllDrawers();return;}
openDrawer('user');}
function bindMenuArea(){const logo=document.getElementById('logo');if(logo){logo.addEventListener('click',toggleMenuArea);}}
function toggleMenuArea(event){if(event){event.stopPropagation();}
const menuArea=document.getElementById('menu-area');if(!menuArea){return;}
if(menuArea.classList.contains('show')){closeAllDrawers();return;}
openDrawer('menu');}
function openDrawer(type){const menuArea=document.getElementById('menu-area');const loginDropdownContent=document.getElementById('login-dropdown-content');const overlay=document.getElementById('dropdown-overlay');if(!overlay){return;}
menuArea?.classList.toggle('show',type==='menu');loginDropdownContent?.classList.toggle('show',type==='user');overlay.classList.add('show');document.body.classList.add('drawer-open');document.body.classList.toggle('drawer-menu-open',type==='menu');document.body.classList.toggle('drawer-user-open',type==='user');if(type==='menu'){markDrawerMenuTipSeen();}}
function closeAllDrawers(){const overlay=document.getElementById('dropdown-overlay');document.getElementById('login-dropdown-content')?.classList.remove('show');document.getElementById('menu-area')?.classList.remove('show');overlay?.classList.remove('show');document.body.classList.remove('drawer-open','drawer-menu-open','drawer-user-open');}
function setupOverlayClickListener(){const overlay=document.getElementById('dropdown-overlay');if(overlay){overlay.addEventListener('click',closeAllDrawers);}}
function setupEscCloseListener(){document.addEventListener('keydown',(event)=>{if(event.key==='Escape'){closeAllDrawers();}});}
function setupDrawerMenuTip(){const tip=document.getElementById('drawer-menu-tip');const dismissBtn=document.getElementById('drawer-menu-tip-dismiss');if(!tip||!shouldShowDrawerMenuTip()){return;}
dismissBtn?.addEventListener('click',(event)=>{event.stopPropagation();markDrawerMenuTipSeen();});window.setTimeout(()=>{if(shouldShowDrawerMenuTip()){showDrawerMenuTip();}},DRAWER_MENU_TIP_DELAY);}
function shouldShowDrawerMenuTip(){return window.matchMedia(DESKTOP_MEDIA_QUERY).matches&&localStorage.getItem(DRAWER_MENU_TIP_KEY)!==DRAWER_MENU_TIP_VERSION;}
function showDrawerMenuTip(){const tip=document.getElementById('drawer-menu-tip');if(!tip){return;}
tip.classList.add('show');tip.setAttribute('aria-hidden','false');}
function hideDrawerMenuTip(){const tip=document.getElementById('drawer-menu-tip');if(!tip){return;}
tip.classList.remove('show');tip.setAttribute('aria-hidden','true');}
function markDrawerMenuTipSeen(){localStorage.setItem(DRAWER_MENU_TIP_KEY,DRAWER_MENU_TIP_VERSION);hideDrawerMenuTip();}})();;(()=>{document.addEventListener('DOMContentLoaded',init)
async function init(){if(await isLogin()){try{const data=await getUserInfo();updateUserInfo(data);const inviteCode=data.invite_code;if(inviteCode){document.getElementById('invite-code').addEventListener('click',()=>{copyToClipboard(`https://${window.location.host}/account/register/?invite_code=${inviteCode}`);})}}catch(error){console.error('获取用户信息失败:',error);}}}
async function getUserInfo(){const response=await fetch('/account/api/user_info/',{cache:'no-store',credentials:'same-origin'});return await response.json();}
function updateUserInfo(data){const usernameEl=document.getElementById('username');const balanceEl=document.getElementById('user-balance');const inviteCodeEl=document.getElementById('invite-code');const invitedByEl=document.getElementById('invited-by');if(usernameEl){usernameEl.innerText=data.username;}
if(balanceEl){balanceEl.textContent=`积分：${data.balance}`;}
if(inviteCodeEl){inviteCodeEl.textContent=`邀请码：${data.invite_code}`;}
if(invitedByEl){if(data.invited_by){invitedByEl.textContent=`邀请人：${data.invited_by}`;invitedByEl.style.display='';}}}
function copyToClipboard(text){if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>{messageModule.toast({content:'邀请注册链接已复制到剪贴板'});}).catch(error=>{messageModule.error({content:`复制失败:${error}`});});}else{const textarea=document.createElement('textarea');textarea.value=text;textarea.style.position='fixed';document.body.appendChild(textarea);textarea.focus();textarea.select();try{const successful=document.execCommand('copy');if(successful){messageModule.toast({content:'邀请注册链接已自动复制到剪贴板'});}else{messageModule.error({content:`自动复制失败! 请手动复制分享链接:${text}`});}}catch(error){messageModule.error({content:`自动复制失败! 请手动复制分享链接:${error}`});}
document.body.removeChild(textarea);}}})();;const captchaModule=(()=>{'use strict';let captchaKey=null;let currentObjectUrl=null;async function generateCaptcha(imgElementId='captcha-img'){try{const timestamp=Date.now();const response=await fetch(`/account/api/captcha/?t=${timestamp}`,{method:'GET',credentials:'same-origin'});if(!response.ok){console.error('生成验证码失败: 获取验证码失败');return null;}
captchaKey=response.headers.get('X-Captcha-Key');if(currentObjectUrl){URL.revokeObjectURL(currentObjectUrl);currentObjectUrl=null;}
const blob=await response.blob();currentObjectUrl=URL.createObjectURL(blob);const imgElement=document.getElementById(imgElementId);if(imgElement){imgElement.src=currentObjectUrl;}
return captchaKey;}catch(error){console.error('生成验证码失败:',error);return null;}}
async function refreshCaptcha(imgElementId='captcha-img'){const captchaValue=await generateCaptcha(imgElementId);if(!captchaValue){messageModule.error({content:'刷新验证码失败'});}}
function getCaptchaKey(){return captchaKey;}
function verifyCaptcha(code){if(!code||code.trim().length===0){messageModule.toast({content:'请输入图形验证码'});return false;}
if(!captchaKey){messageModule.error({content:'验证码未初始化，请刷新页面重试'});return false;}
return true;}
return{generateCaptcha,refreshCaptcha,getCaptchaKey,verifyCaptcha,};})();;const loginModule=(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);let currentLoginType='password';let loginEventsBound=false;function init(){const loginBtn=document.getElementById('login-btn');if(loginBtn){loginBtn.addEventListener('click',showLoginBox);}}
function createLoginContainer(){if(document.getElementById('login-box')){return;}
const csrfToken=getCookie('csrftoken')||'';const loginHTML=`
            <div class="login-box" id="login-box">
                <div class="login-close-btn" id="login-close-btn">✕</div>
                <h1 class="auth-title">登录</h1>
                <!-- Tab切换 -->
                <div class="login-tabs">
                    <div class="login-tab active" data-tab="password" id="tab-password">密码登录</div>
                    <div class="login-tab" data-tab="sms" id="tab-sms">手机登录</div>
                </div>
                <div class="login-container">
                    <div class="login-form-track">
                    <!-- 密码登录表单 -->
                    <form method="post" action="" class="login-form active" id="passwordLoginForm" aria-hidden="false">
                        <input type="hidden" name="csrfmiddlewaretoken" id="csrf-token-input-password" value="${csrfToken}">
                        <div class="form-group">
                            <label for="id_username_password">手机号/邮箱</label>
                            <input type="text" id="id_username_password" name="username" placeholder="手机号/邮箱" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="id_password">密码</label>
                            <div class="password-input-wrapper">
                                <input type="password" id="id_password" name="password" placeholder="密码" class="form-control" required>
                                <button type="button" class="password-toggle-btn" id="password-toggle-btn" aria-label="显示/隐藏密码">
                                    <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <svg class="eye-off-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="form-options">
                            <label class="remember-me">
                                <input type="checkbox" id="id_remember" name="remember" class="form-check-input" checked>
                                <span>记住我</span>
                            </label>
                            <a href="/account/password/reset/" class="forgot-password">忘记密码？</a>
                        </div>
                        <div class="agreement-checkbox">
                            <input type="checkbox" id="agree-checkbox-password" required>
                            <label for="agree-checkbox-password">我已阅读并同意
                                <a id="user-agreement">《用户协议》</a>
                                和
                                <a id="privacy-policy">《隐私政策》</a></label>
                        </div>
                        <div class="btn" id="login-password">登录</div>
                    </form>
                    <!-- 验证码登录表单 -->
                    <form method="post" action="" class="login-form" id="smsLoginForm" aria-hidden="true">
                        <input type="hidden" name="csrfmiddlewaretoken" id="csrf-token-input-sms" value="${csrfToken}">
                        <div class="form-group">
                            <label for="id_phone_sms">手机号</label>
                            <input type="tel" id="id_phone_sms" name="phone_number" placeholder="手机号" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>图形验证码</label>
                            <div class="captcha-container">
                                <input type="text" id="id_captcha_code" placeholder="输入验证码" class="captcha-input" maxlength="4">
                                <div class="captcha-wrapper">
                                    <img id="captcha-img" class="captcha-img" alt="验证码">
                                    <button type="button" class="captcha-refresh" id="captcha-refresh" title="刷新验证码">↻</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="id_sms_code">短信验证码</label>
                            <div class="sms-input-wrapper">
                                <input type="text" id="id_sms_code" name="sms_code" placeholder="短信验证码" class="form-control" required>
                                <button type="button" class="send-sms-btn" id="send-sms-btn">获取验证码</button>
                            </div>
                        </div>
                        <div class="form-options">
                            <label class="remember-me">
                                <input type="checkbox" id="id_remember_sms" name="remember" class="form-check-input" checked>
                                <span>记住我</span>
                            </label>
                        </div>
                        <div class="agreement-checkbox">
                            <input type="checkbox" id="agree-checkbox-sms" required>
                            <label for="agree-checkbox-sms">我已阅读并同意
                                <a id="user-agreement-sms">《用户协议》</a>
                                和
                                <a id="privacy-policy-sms">《隐私政策》</a></label>
                        </div>
                        <div class="form-group">
                            <label>提示：未注册用户将自动注册</label>
                        </div>
                        <div class="btn" id="login-sms">登录</div>
                    </form>
                    </div>
                </div>
                <div class="register-hint">
                    <a href="/account/register/" class="register-link">使用邮箱注册</a>
                </div>
            </div>
        `;document.body.insertAdjacentHTML('beforeend',loginHTML);setFormInteractive(document.getElementById('passwordLoginForm'),true);setFormInteractive(document.getElementById('smsLoginForm'),false);}
function bindLoginEvents(){if(loginEventsBound){return;}
const userAgreementBtn=document.getElementById('user-agreement');const privacyPolicyBtn=document.getElementById('privacy-policy');const userAgreementBtnSms=document.getElementById('user-agreement-sms');const privacyPolicyBtnSms=document.getElementById('privacy-policy-sms');const loginCloseBtn=document.getElementById('login-close-btn');const loginSubmitBtnPassword=document.getElementById('login-password');const loginSubmitBtnSms=document.getElementById('login-sms');const passwordToggleBtn=document.getElementById('password-toggle-btn');const sendSmsBtn=document.getElementById('send-sms-btn');const tabPassword=document.getElementById('tab-password');const tabSms=document.getElementById('tab-sms');const captchaRefreshBtn=document.getElementById('captcha-refresh');const captchaImg=document.getElementById('captcha-img');if(userAgreementBtn){userAgreementBtn.addEventListener('click',getUserAgreement);}
if(privacyPolicyBtn){privacyPolicyBtn.addEventListener('click',getPrivacyPolicy);}
if(userAgreementBtnSms){userAgreementBtnSms.addEventListener('click',getUserAgreement);}
if(privacyPolicyBtnSms){privacyPolicyBtnSms.addEventListener('click',getPrivacyPolicy);}
if(loginCloseBtn){loginCloseBtn.addEventListener('click',closeLoginBox);}
if(loginSubmitBtnPassword){loginSubmitBtnPassword.addEventListener('click',()=>startLogin('password'));}
if(loginSubmitBtnSms){loginSubmitBtnSms.addEventListener('click',()=>startLogin('sms'));}
if(passwordToggleBtn){passwordToggleBtn.addEventListener('click',togglePasswordVisibility);}
if(sendSmsBtn){sendSmsBtn.addEventListener('click',sendSmsCode);}
if(tabPassword){tabPassword.addEventListener('click',()=>switchTab('password'));}
if(tabSms){tabSms.addEventListener('click',()=>switchTab('sms'));}
if(captchaRefreshBtn){captchaRefreshBtn.addEventListener('click',()=>{captchaModule.refreshCaptcha('captcha-img');});}
if(captchaImg){captchaImg.addEventListener('click',()=>{captchaModule.refreshCaptcha('captcha-img');});}
loginEventsBound=true;}
function switchTab(tabType){if(currentLoginType===tabType){return;}
currentLoginType=tabType;const loginBox=document.getElementById('login-box');const tabPassword=document.getElementById('tab-password');const tabSms=document.getElementById('tab-sms');const passwordForm=document.getElementById('passwordLoginForm');const smsForm=document.getElementById('smsLoginForm');const isPasswordLogin=tabType==='password';loginBox?.classList.toggle('is-sms-login',!isPasswordLogin);tabPassword?.classList.toggle('active',isPasswordLogin);tabSms?.classList.toggle('active',!isPasswordLogin);passwordForm?.classList.toggle('active',isPasswordLogin);smsForm?.classList.toggle('active',!isPasswordLogin);setFormInteractive(passwordForm,isPasswordLogin);setFormInteractive(smsForm,!isPasswordLogin);}
function setFormInteractive(form,isActive){if(!form){return;}
form.setAttribute('aria-hidden',String(!isActive));form.querySelectorAll('input, button, select, textarea, a, [tabindex]').forEach(element=>{if(isActive){if(element.dataset.previousTabindex!==undefined){element.setAttribute('tabindex',element.dataset.previousTabindex);delete element.dataset.previousTabindex;}else{element.removeAttribute('tabindex');}}else{if(element.hasAttribute('tabindex')){element.dataset.previousTabindex=element.getAttribute('tabindex');}
element.setAttribute('tabindex','-1');}});}
function togglePasswordVisibility(){const passwordInput=document.getElementById('id_password');const toggleBtn=document.getElementById('password-toggle-btn');const eyeIcon=toggleBtn.querySelector('.eye-icon');const eyeOffIcon=toggleBtn.querySelector('.eye-off-icon');if(passwordInput.type==='password'){passwordInput.type='text';eyeIcon.style.display='none';eyeOffIcon.style.display='block';}else{passwordInput.type='password';eyeIcon.style.display='block';eyeOffIcon.style.display='none';}}
async function sendSmsCode(){const phoneInput=document.getElementById('id_phone_sms');const captchaInput=document.getElementById('id_captcha_code');const phoneNumber=phoneInput.value.trim();const captchaCode=captchaInput.value.trim();if(!phoneNumber){messageModule.toast({content:'请输入手机号'});return;}
if(!/^1[3-9]\d{9}$/.test(phoneNumber)){messageModule.toast({content:'请输入正确的手机号'});return;}
if(!captchaModule.verifyCaptcha(captchaCode)){await captchaModule.refreshCaptcha('captcha-img');captchaInput.value='';return;}
const sendBtn=document.getElementById('send-sms-btn');sendBtn.disabled=true;sendBtn.textContent='发送中...';try{const captchaKey=captchaModule.getCaptchaKey();const response=await fetch('/account/api/send-sms-code/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify({phone_number:phoneNumber,captcha_key:captchaKey,captcha_code:captchaCode}),credentials:'same-origin'});const result=await response.json();if(result.success){messageModule.toast({content:'验证码已发送，20分钟内有效'});startCountdown(sendBtn,20*60);}else{messageModule.error({content:result.message||'发送失败'});sendBtn.disabled=false;sendBtn.textContent='获取验证码';await captchaModule.refreshCaptcha('captcha-img');captchaInput.value='';}}catch(error){console.error('发送验证码失败:',error);messageModule.error({content:'网络错误，请稍后重试'});sendBtn.disabled=false;sendBtn.textContent='获取验证码';await captchaModule.refreshCaptcha('captcha-img');captchaInput.value='';}}
function startCountdown(button,seconds=60){let countdown=seconds;button.disabled=true;button.textContent=`${Math.floor(countdown / 60)}分${countdown % 60}秒后重发`;const timer=setInterval(()=>{countdown--;if(countdown<=0){clearInterval(timer);button.disabled=false;button.textContent='获取验证码';}else{button.textContent=`${Math.floor(countdown / 60)}分${countdown % 60}秒后重发`;}},1000);}
async function ensureCsrfToken(){if(getCookie('csrftoken')){return true;}
let attempts=0;const maxAttempts=5;while(attempts<maxAttempts){try{await fetch('/account/api/is_login/',{method:'GET',credentials:'same-origin'});await new Promise(resolve=>setTimeout(resolve,500));if(getCookie('csrftoken')){return true;}}catch(e){console.warn(`CSRF token 获取尝试 ${attempts + 1} 失败:`,e);}
attempts++;}
return false;}
async function showLoginBox(){createLoginContainer();const hasCsrfToken=await ensureCsrfToken();if(!hasCsrfToken){console.warn('无法获取CSRF token，登录可能会失败');}
const csrfInputPassword=document.getElementById('csrf-token-input-password');const csrfInputSms=document.getElementById('csrf-token-input-sms');if(csrfInputPassword){csrfInputPassword.value=getCookie('csrftoken')||'';}
if(csrfInputSms){csrfInputSms.value=getCookie('csrftoken')||'';}
bindLoginEvents();try{await captchaModule.generateCaptcha('captcha-img');}catch(error){console.error('生成图形验证码失败:',error);}
const loginBox=document.getElementById('login-box');loginBox.classList.add('show');}
function closeLoginBox(){const loginBox=document.getElementById('login-box');loginBox.classList.remove('show');}
async function startLogin(loginType){currentLoginType=loginType;disableLoginButton();try{const loginData=prepareLoginData(loginType);const response=await sendLoginRequest(loginData);await handleLoginResponse(response);}catch(error){messageModule.error({content:error});}finally{enableLoginButton();}}
function prepareLoginData(loginType){const remember=document.getElementById(loginType==='password'?'id_remember':'id_remember_sms');if(loginType==='password'){const username=document.getElementById('id_username_password').value.trim();const password=document.getElementById('id_password').value;return{login_type:'password',username:username,password:password,remember:remember?remember.checked:false};}else{const phone_number=document.getElementById('id_phone_sms').value.trim();const sms_code=document.getElementById('id_sms_code').value.trim();return{login_type:'sms',phone_number:phone_number,sms_code:sms_code,remember:remember?remember.checked:false};}}
async function sendLoginRequest(loginData){if(!validateLoginForm(loginData)){enableLoginButton();return new Response(JSON.stringify({success:false,message:'验证失败'}),{status:400,headers:{'Content-Type':'application/json'}});}
return await fetch('/account/login/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify(loginData),credentials:'same-origin'});}
function validateLoginForm(loginData){const loginType=loginData.login_type;if(loginType==='password'){if(!loginData.username){messageModule.toast({content:'请输入手机号或邮箱'});return false;}
if(!loginData.password){messageModule.toast({content:'请输入密码'});return false;}
const agreeCheckbox=document.getElementById('agree-checkbox-password');if(agreeCheckbox&&!agreeCheckbox.checked){messageModule.toast({content:'请阅读并同意用户协议和隐私政策'})
return false;}}else{if(!loginData.phone_number){messageModule.toast({content:'请输入手机号'});return false;}
if(!loginData.sms_code){messageModule.toast({content:'请输入验证码'});return false;}
const agreeCheckbox=document.getElementById('agree-checkbox-sms');if(agreeCheckbox&&!agreeCheckbox.checked){messageModule.toast({content:'请阅读并同意用户协议和隐私政策'})
return false;}}
const csrftoken=getCookie('csrftoken');if(!csrftoken){messageModule.toast({content:'无法获取CSRF令牌，请刷新页面重试'})
enableLoginButton();return false;}
return true;}
async function handleLoginResponse(response){const result=await response.json();if(response.ok){if(result.success){const userName=result.username;messageModule.toast({content:`登录成功！欢迎您 ${userName}`})
clearLoginStateCache();if(result['has_password']===false){showSetPasswordPrompt();}else{window.location.assign(result['redirect_url']||window.location.href);}}else{let errorMsg=result.message;if(result['suggestion']){errorMsg+='\n\n'+result['suggestion'];}
errorMsg=marked.parse(errorMsg);messageModule.error({content:errorMsg,isHtml:true})}}else{let errorMsg=result.message||'登录失败';if(result['suggestion']){errorMsg+='\n\n'+result['suggestion'];}
errorMsg=marked.parse(errorMsg);messageModule.error({content:errorMsg,isHtml:true})
if(result['error_type']==='account_not_active'){showResendActivationOption();}}}
function showSetPasswordPrompt(){closeLoginBox();messageModule.warning({title:'设置登录密码',content:'您尚未设置登录密码，建议设置密码以便使用密码登录。',showCancel:true,confirmText:'去设置',cancelText:'稍后再说',onConfirm:function(){window.location.href='/account/personal_center/?tab=personal-information';},onCancel:function(){window.location.reload();}});}
function showResendActivationOption(){const username=document.getElementById('id_username_password').value.trim();messageModule.warning({title:'账号未激活',content:'您的账号尚未激活。是否需要重新发送激活邮件？',showCancel:true,confirmText:'重发邮件',cancelText:'取消',onConfirm:function(){resendActivationEmail(username);}});}
async function resendActivationEmail(username){try{const response=await fetch('/account/api/resend-activation/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify({username:username}),credentials:'same-origin'});const result=await response.json();if(result.success){messageModule.success({content:'激活邮件已重新发送，请检查您的邮箱（包括垃圾邮件文件夹）'});}else{messageModule.error({content:result.message||'发送失败，请稍后重试'});}}catch(error){console.error('重发激活邮件失败:',error);messageModule.error({content:'网络错误，请稍后重试'});}}
function getUserAgreement(){fetch('/account/api/agreement/').then(response=>response.json()).then(data=>{const title='用户协议';const content=data['user_agreement'];messageModule.show({title:title,content:content,isHtml:true})}).catch(error=>{messageModule.error({content:`获取用户协议失败:${error}`});});}
function getPrivacyPolicy(){fetch('/account/api/agreement/').then(response=>response.json()).then(data=>{const title='隐私政策';const content=data['privacy_policy'];messageModule.show({title:title,content:content,isHtml:true})}).catch(error=>{messageModule.error({content:`获取隐私政策失败: ${error}`});});}
function disableLoginButton(){const submitButtonId=currentLoginType==='sms'?'login-sms':'login-password';const loginButton=document.getElementById(submitButtonId);if(loginButton){loginButton.disabled=true;loginButton.classList.add('disabled');loginButton.textContent='登录中...';}}
function enableLoginButton(){const submitButtonId=currentLoginType==='sms'?'login-sms':'login-password';const loginButton=document.getElementById(submitButtonId);if(loginButton){loginButton.disabled=false;loginButton.classList.remove('disabled');loginButton.textContent='登录';}}
return{showLoginBox:showLoginBox,};})();;(()=>{document.addEventListener('DOMContentLoaded',init);function init(){const logoutBtn=document.getElementById('logout');if(logoutBtn){logoutBtn.addEventListener('click',startLogout);}}
async function startLogout(){const confirmed=await messageModule.confirm({content:'确定要退出登录吗?'});if(!confirmed){return;}
if(typeof WebSocketMessage!=='undefined'){WebSocketMessage.disable();}
try{const data=await submitLogout();if(data.success){messageModule.toast({content:'退出登录成功',type:'success',duration:1500});window.location.href='/';}else{messageModule.error({content:data.message||'退出登录失败',});}}catch(error){messageModule.error({content:`退出登录时发生错误，请稍后重试`,});}}
async function submitLogout(){const csrfToken=getCookie('csrftoken');const response=await fetch('/account/logout/',{method:'POST',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':csrfToken},credentials:'same-origin'});if(!response.ok){messageModule.error({content:`网络错误! 状态码: ${response.status}`});return{success:false,message:`网络错误，状态码: ${response.status}`};}
return response.json();}})();;(()=>{document.addEventListener('DOMContentLoaded',init);let notificationPermissionEventsBound=false;let notificationPermissionRequestInFlight=false;let notificationPermissionTriggerHandler=null;const NOTIFIED_MESSAGE_IDS_KEY='lingyao_notified_private_message_ids';const NOTIFICATION_PERMISSION_HINT_KEY='lingyao_notification_permission_hint_shown';const NOTIFICATION_PERMISSION_PROMPT_KEY='lingyao_notification_permission_prompt_shown';async function init(){if(await isLogin()){bindNotificationPermissionRequest();showNotificationPermissionPrompt();clearNotifiedMessageIds();try{await syncUnreadMessagesState();}catch(error){}
initWebSocket();}}
async function requestNotificationPermission(){return'denied';}
function bindNotificationPermissionRequest(){if(notificationPermissionEventsBound||!('Notification'in window)){return;}
if(Notification.permission!=='default'){return;}
notificationPermissionTriggerHandler=async()=>{if(notificationPermissionRequestInFlight){return;}
notificationPermissionRequestInFlight=true;const permission=await requestNotificationPermission();if(permission==='granted'){showNotificationPermissionGranted();await syncUnreadMessagesState();}else if(permission==='denied'){showNotificationPermissionHint();}
unbindNotificationPermissionRequest();notificationPermissionRequestInFlight=false;};['click','touchstart','keydown'].forEach((eventName)=>{document.addEventListener(eventName,notificationPermissionTriggerHandler,{passive:true});});notificationPermissionEventsBound=true;}
function unbindNotificationPermissionRequest(){if(notificationPermissionTriggerHandler){['click','touchstart','keydown'].forEach((eventName)=>{document.removeEventListener(eventName,notificationPermissionTriggerHandler,{passive:true});});notificationPermissionTriggerHandler=null;}
notificationPermissionEventsBound=false;}
function showNotificationPermissionPrompt(){}function showNotificationPermissionGranted(){if(typeof messageModule!=='undefined'&&messageModule.success){messageModule.success({content:'通知权限已开启，后续可正常接收私信与推送提醒。',duration:3000,});}}
function initWebSocket(){if(typeof WebSocketMessage!=='undefined'){WebSocketMessage.onUnreadCountUpdate((count)=>{updateMessageBadge(count);if(count===0){clearNotifiedMessageIds();}});WebSocketMessage.onNewMessage((message)=>{if(message['is_admin']){incrementBadge();showNotification(message).then((shown)=>{if(shown){rememberNotifiedMessageId(message.id);}});}});WebSocketMessage.enable();WebSocketMessage.connect();}}
async function getMessage(){const response=await fetch('/notice/get-unread-messages/',{method:'GET',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},credentials:'same-origin'});if(!response.ok){return null;}
return await response.json();}
async function syncUnreadMessagesState(){const data=await getMessage();if(data&&data.has_unread){updateMessageBadge(data.unread_count);if('Notification'in window&&Notification.permission==='denied'){showNotificationPermissionHint();}
await notifyUnreadMessages(data['messages']||[]);return;}
updateMessageBadge(0);clearNotifiedMessageIds();}
function updateMessageBadge(count){const menuBadge=document.getElementById('menu-private-msg-badge');const userBadge=document.getElementById('user-private-msg-badge');if(!menuBadge||!userBadge)return;if(count>0){userBadge.classList.add('show');menuBadge.classList.add('show');userBadge.innerText=String(count);menuBadge.innerText=String(count);}else{userBadge.classList.remove('show');menuBadge.classList.remove('show');userBadge.innerText='';menuBadge.innerText='';}}
function incrementBadge(){const menuBadge=document.getElementById('menu-private-msg-badge');const userBadge=document.getElementById('user-private-msg-badge');if(!menuBadge||!userBadge)return;let currentCount=parseInt(userBadge.innerText)||0;currentCount++;userBadge.classList.add('show');menuBadge.classList.add('show');userBadge.innerText=String(currentCount);menuBadge.innerText=String(currentCount);}
async function notifyUnreadMessages(messages){if(!Array.isArray(messages)||messages.length===0){clearNotifiedMessageIds();return;}
const notifiedIds=new Set(getNotifiedMessageIds());const unreadIds=[];for(const message of messages){unreadIds.push(message.id);if(!notifiedIds.has(message.id)){const shown=await showNotification(message);if(shown){notifiedIds.add(message.id);}}}
saveNotifiedMessageIds(Array.from(notifiedIds).filter((id)=>unreadIds.includes(id)));}
function getNotifiedMessageIds(){try{const rawValue=window.localStorage.getItem(NOTIFIED_MESSAGE_IDS_KEY);const parsedValue=rawValue?JSON.parse(rawValue):[];return Array.isArray(parsedValue)?parsedValue:[];}catch(error){return[];}}
function saveNotifiedMessageIds(messageIds){try{window.localStorage.setItem(NOTIFIED_MESSAGE_IDS_KEY,JSON.stringify(messageIds));}catch(error){}}
function rememberNotifiedMessageId(messageId){const notifiedIds=getNotifiedMessageIds();if(notifiedIds.includes(messageId)){return;}
notifiedIds.push(messageId);saveNotifiedMessageIds(notifiedIds);}
function clearNotifiedMessageIds(){try{window.localStorage.removeItem(NOTIFIED_MESSAGE_IDS_KEY);}catch(error){}}
async function showNotification(message){if(!('Notification'in window)||Notification.permission!=='granted'){if('Notification'in window&&Notification.permission==='denied'){showNotificationPermissionHint();}
return false;}
const title=message.title||'灵爻妙解 - 站长私信';const options={body:(message.content||'您收到一条新消息').substring(0,100),icon:'/static/base/img/lingyao-192x192.png',badge:'/static/base/img/lingyao-96x96.png',tag:'lingyao-admin-private-message',renotify:true,requireInteraction:true,data:{url:'/account/personal_center/?tab=contact-us'}};if('serviceWorker'in navigator){try{const registration=await navigator.serviceWorker.ready;await registration.showNotification(title,options);return true;}catch(error){}}
try{const notification=new Notification(title,options);notification.onclick=function(){window.focus();window.location.href='/account/personal_center/?tab=contact-us';notification.close();};return true;}catch(error){return false;}}
function showNotificationPermissionHint(){}return{enable:function(){},disable:function(){},connect:function(){},disconnect:function(){},onNewMessage:function(){},onUnreadCountUpdate:function(){},onMessagesRead:function(){}};})();;/*!
 * popoPicker.js v2.3 - 性能与内存优化版
 * 日期时间滚动选择器
 *
 * 变更记录 v2.3:
 * - 修复内存泄漏: 添加事件监听器清理机制，防止内存泄漏
 * - 定时器优化: 使用 requestAnimationFrame 替代 setInterval，性能更好
 * - DOM查询优化: 缓存动画状态，减少 getComputedStyle 调用
 * - 数据缓存: 添加静态数据缓存，避免重复生成相同数据
 * - 批量DOM更新: 使用 requestAnimationFrame 批量更新，减少重排重绘
 *
 * 变更记录 v2.2:
 * - 统一配置管理: 所有参数集中到 CONFIG 对象，便于维护
 * - PC端滚轮优化: 添加惯性、吸附、累积滚动，体验更丝滑
 * - 性能优化: 缓存DOM查询结果，减少重绘重排
 * - 动画优化: 可配置缓动函数，不同场景使用不同动画曲线
 * - 代码优化: 提取通用函数，减少代码重复
 *
 * ========================================
 * 使用示例 / Usage Examples
 * ========================================
 *
 * 1. 基础日期时间选择器
 * ------------------------------------------
 * HTML:
 * <input type="text" id="datetime-input" placeholder="选择日期时间" />
 *
 * JavaScript:
 * popoPicker.dateTime('#datetime-input', {
 *     display: 'bottom',        // 显示位置: bottom, center, auto
 *     date: true,               // 显示日期
 *     time: true,               // 显示时间
 *     format: 'YYYY-MM-DD HH:mm:ss',
 *     save: (result, target) => {
 *         console.log('选择的日期时间:', result);
 *     }
 * });
 *
 * 2. PC端输入框聚焦弹出
 * ------------------------------------------
 * popoPicker.dateTime('#pc-datetime', {
 *     display: 'auto',          // PC端自动定位在输入框周围
 *     position: 'bottom-left',  // 优先位置
 *     format: 'YYYY-MM-DD HH:mm:ss'
 * });
 *
 * 3. 仅日期选择器
 * ------------------------------------------
 * popoPicker.dateTime('#date-only', {
 *     date: true,
 *     time: false,
 *     format: 'YYYY-MM-DD'
 * });
 *
 * 4. 自定义选项选择器（基础类调用）
 * ------------------------------------------
 * HTML:
 * <input type="text" id="custom-picker" placeholder="选择城市" />
 *
 * JavaScript:
 * popoPicker.picker('#custom-picker', {
 *     display: 'bottom',        // 显示位置
 *     headTitle: '选择城市',     // 标题
 *     wheels: [
 *         {
 *             infinite: true,   // 是否循环滚动
 *             selected: 'beijing',  // 默认选中值
 *             label: '',        // 标签（如"市"）
 *             data: [
 *                 { value: 'beijing', display: '北京' },
 *                 { value: 'shanghai', display: '上海' },
 *                 { value: 'guangzhou', display: '广州' },
 *                 { value: 'shenzhen', display: '深圳' }
 *             ]
 *         }
 *     ],
 *     save: (result, target) => {
 *         console.log('选择结果:', result);
 *     }
 * });
 *
 * 5. 多列自定义选择器
 * ------------------------------------------
 * popoPicker.picker('#multi-picker', {
 *     display: 'bottom',
 *     headTitle: '选择省市',
 *     wheels: [
 *         {
 *             infinite: false,
 *             selected: 'guangdong',
 *             label: '省',
 *             data: [
 *                 { value: 'guangdong', display: '广东' },
 *                 { value: 'zhejiang', display: '浙江' },
 *                 { value: 'jiangsu', display: '江苏' }
 *             ]
 *         },
 *         {
 *             infinite: false,
 *             selected: 'guangzhou',
 *             label: '市',
 *             data: [
 *                 { value: 'guangzhou', display: '广州' },
 *                 { value: 'shenzhen', display: '深圳' },
 *                 { value: 'dongguan', display: '东莞' }
 *             ]
 *         }
 *     ],
 *     save: (result, target) => {
 *         console.log('选择的省市:', result);
 *     }
 * });
 *
 * ========================================
 * 配置选项 / Configuration Options
 * ========================================
 *
 * @param {string} selector - CSS选择器
 * @param {object} options - 配置选项
 * @param {string} options.display - 显示位置: 'bottom', 'center', 'auto'
 * @param {string} options.position - PC端优先位置: 'bottom-left', 'bottom-right', 'top-left', 'top-right'
 * @param {boolean} options.date - 是否显示日期选择
 * @param {boolean} options.time - 是否显示时间选择
 * @param {string} options.format - 日期时间格式: 'YYYY-MM-DD HH:mm:ss'
 * @param {boolean} options.showLabel - 是否显示标签（年月日时分）
 * @param {boolean} options.showNowBtn - 是否显示"现在"按钮（dateTime模式默认true）
 * @param {string} options.headTitle - 标题栏文字
 * @param {number} options.beginYear - 开始年份
 * @param {number} options.endYear - 结束年份
 * @param {function} options.save - 确认回调函数
 * @param {function} options.cancel - 取消回调函数
 *
 */const popoPicker=(()=>{'use strict';const extend=(...sources)=>{const target=sources[0]||{};for(let i=1;i<sources.length;i++){const source=sources[i];if(source){Object.keys(source).forEach(key=>{if(source[key]!==undefined){target[key]=source[key];}});}}
return target;};const isPC=()=>{const mobileAgents=['Android','iPhone','SymbianOS','Windows Phone','iPad','iPod'];return!mobileAgents.some(agent=>navigator.userAgent.includes(agent));};const padZero=(num)=>String(num).padStart(2,'0');const formatDateTime=(result,format='YYYY-MM-DD HH:mm:ss')=>{if(!result?.length)return'';const values=result.map(r=>r.display);let formatted=format;if(result.length===5){formatted=formatted.replace('YYYY',values[0]).replace('MM',values[1]).replace('DD',values[2]).replace('HH',values[3]).replace('mm',values[4]).replace('ss','00');}else if(result.length===3){formatted=formatted.replace('YYYY',values[0]).replace('MM',values[1]).replace('DD',values[2]);}else if(result.length===2){formatted=formatted.replace('HH',values[0]).replace('mm',values[1]).replace('ss','00');}else{formatted=values.join(' ');}
return formatted;};const isLeapYear=(year)=>{return(year%4===0&&year%100!==0)||year%400===0;};const getDaysInMonth=(year,month)=>{const smallMonths=['04','06','09','11'];if(smallMonths.includes(month)){return 30;}else if(month==='02'){return isLeapYear(Number(year))?29:28;}
return 31;};const createElement=(html)=>{const div=document.createElement('div');div.innerHTML=html;return div.firstElementChild;};const addEventListeners=(element,events)=>{Object.entries(events).forEach(([event,handler])=>{element.addEventListener(event,handler,false);});};const removeElement=(element,delay=300)=>{if(!element)return;element.classList.add('hide');setTimeout(()=>element.remove(),delay);};const createPickerHTML=(config)=>{const{wheels,display,headTitle,showNowBtn}=config;const isCenter=display==='center';const isAuto=display==='auto'&&isPC();return`
            <div class="p-select-wrap${isCenter ? ' p-center' : ''}${isAuto ? ' p-auto' : ''}">
                <div class="p-select-main">
                    ${createHeaderHTML(headTitle, isCenter, showNowBtn)}
                    ${createBodyHTML(wheels)}
                    ${isCenter ? createFooterHTML() : ''}
                </div>
                <div class="p-select-mask"></div>
            </div>
        `;};const createHeaderHTML=(title,isCenter,showNowBtn=false)=>{return`
            <div class="p-select-head">
                ${!isCenter ? '<a href="javascript:void(0)" class="p-select-cancel-btn">取消</a>' : ''}
                ${showNowBtn ? '<a href="javascript:void(0)" class="p-select-now-btn">现在</a>' : ''}
                ${title ? `<div class="p-select-title">${title}</div>` : ''}
                ${!isCenter ? '<a href="javascript:void(0)" class="p-select-submit-btn">确认</a>' : ''}
            </div>
        `;};const createBodyHTML=(wheels)=>{return`
            <div class="p-select-body">
                <div class="p-select-line"></div>
                ${wheels.map(wheel => createWheelHTML(wheel)).join('')}
            </div>
        `;};const createWheelHTML=(wheel)=>{return`
            <div class="p-select-item">
                <div class="p-select-col">
                    <div class="p-select-list">
                        <ul class="p-select-ul"></ul>
                    </div>
                </div>
                ${wheel.label ? `<div class="p-select-col p-select-label">${wheel.label}</div>` : ''}
            </div>
        `;};const createFooterHTML=()=>{return`
            <div class="p-select-foot">
                <a href="javascript:void(0)" class="p-select-cancel-btn">取消</a>
                <a href="javascript:void(0)" class="p-select-submit-btn">确认</a>
            </div>
        `;};const createListItemHTML=(wheel,itemSize)=>{const{data,infinite,selected}=wheel;const len=data.length;const selectedIdx=data.findIndex(item=>item.value===selected);const start=selectedIdx-itemSize;const end=selectedIdx+itemSize;let html='';for(let i=start;i<=end;i++){const idx=infinite?((i%len)+len)%len:i;if(!infinite&&(i<0||i>=len)){html+=`<li data-index="${i}" style="opacity: 0"></li>`;}else{const item=data[idx];html+=`<li data-index="${i}" data-val="${item.value}">${item.display}</li>`;}}
return html;};class WheelScroller{static CONFIG={ITEM_HEIGHT:34,ITEM_SIZE:9,POSITION_OFFSET:68,ANIMATION:{WHEEL_SCROLL:100,TOUCH_SCROLL:0,TOUCH_END:200,INERTIA_MIN:500,INERTIA_MAX:1500,SNAP:200},THROTTLE:{WHEEL:16,UPDATE:100},INERTIA:{TIME_THRESHOLD:300,SPEED_MULTIPLIER:3},WHEEL:{DELTA_THRESHOLD:80,MAX_DELTA:260,MAX_STEPS_PER_EVENT:3,NON_INFINITE_MAX_STEPS:3,ACCUMULATOR_TIMEOUT:250},EASING:{DEFAULT:'cubic-bezier(0.19, 1, 0.22, 1)',SNAP:'cubic-bezier(0.25, 0.46, 0.45, 0.94)',WHEEL:'cubic-bezier(0.33, 1, 0.68, 1)'}};constructor(element,wheel,index,picker){this.element=element;this.wheel=wheel;this.index=index;this.picker=picker;this.ITEM_HEIGHT=WheelScroller.CONFIG.ITEM_HEIGHT;this.ITEM_SIZE=WheelScroller.CONFIG.ITEM_SIZE;this.POSITION_OFFSET=WheelScroller.CONFIG.POSITION_OFFSET;this.state={scrollY:-this.ITEM_HEIGHT*this.ITEM_SIZE,marginTop:0,current:0,clickDown:false,inertia:true,startY:0,curY:0,lastY:1,moveY:0,hasMoved:false,startTime:null,endTime:null,pendingWheelDelta:0,lastWheelAppliedTime:0,lastWheelDir:0};this.scrollList=element.querySelector('.p-select-ul');this.items=[];this._cachedPosition=this.POSITION_OFFSET;this.wheelThrottleTimer=null;this.wheelAccumulator=0;this.wheelAccumulatorTimer=null;this.inertiaAnimationFrame=null;this.inertiaUpdateTimer=null;this.eventHandlers={touchStart:this.handleTouchStart.bind(this),touchMove:this.handleTouchMove.bind(this),touchEnd:this.handleTouchEnd.bind(this),wheel:this.handleWheel.bind(this),itemClick:this.handleItemClick.bind(this)};this.data=wheel.data;this.infinite=wheel.infinite;this.selectedIdx=this.getSelectedIndex();this.init();}
getSelectedIndex(){return this.data.findIndex(item=>item.value===this.wheel.selected)||0;}
init(){this.renderItems();this.bindEvents();this.updatePosition(0,this.state.scrollY);}
renderItems(){this.scrollList.innerHTML=createListItemHTML(this.wheel,this.ITEM_SIZE);this.items=Array.from(this.scrollList.querySelectorAll('li'));}
bindEvents(){if(isPC()){this.bindPCEvents();}else{this.bindMobileEvents();}
this.scrollList.addEventListener('click',this.eventHandlers.itemClick,false);}
bindPCEvents(){this.scrollContainer=this.element.querySelector('.p-select-list');this.element.addEventListener('mousedown',this.eventHandlers.touchStart,false);this.scrollContainer.addEventListener('wheel',this.eventHandlers.wheel,{passive:false});document.addEventListener('mousemove',this.eventHandlers.touchMove,false);document.addEventListener('mouseup',this.eventHandlers.touchEnd,false);}
bindMobileEvents(){this.element.addEventListener('touchstart',this.eventHandlers.touchStart,{passive:true});this.element.addEventListener('touchmove',this.eventHandlers.touchMove,{passive:false});this.element.addEventListener('touchend',this.eventHandlers.touchEnd,{passive:true});this.element.addEventListener('touchcancel',this.eventHandlers.touchEnd,{passive:true});}
applyBoundary(scrollY){if(this.infinite){return scrollY;}
const maxScroll=this.selectedIdx*this.ITEM_HEIGHT-this.ITEM_HEIGHT*this.ITEM_SIZE;const minScroll=maxScroll-this.ITEM_HEIGHT*(this.data.length-1);return Math.max(minScroll,Math.min(maxScroll,scrollY));}
handleWheel(e){e.preventDefault();e.stopPropagation();const config=WheelScroller.CONFIG;let delta=e.deltaY;if(e.deltaMode===1){delta*=this.ITEM_HEIGHT;}else if(e.deltaMode===2){delta*=this.ITEM_HEIGHT*this.ITEM_SIZE;}
const maxDelta=config.WHEEL.MAX_DELTA;if(maxDelta){delta=Math.max(-maxDelta,Math.min(maxDelta,delta));}
this.state.pendingWheelDelta+=delta;this.scheduleWheelProcess();}
scheduleWheelProcess(){const config=WheelScroller.CONFIG;if(this.wheelThrottleTimer){return;}
this.wheelThrottleTimer=setTimeout(()=>{this.wheelThrottleTimer=null;this.applyWheelDelta();},config.THROTTLE.WHEEL);}
applyWheelDelta(){const config=WheelScroller.CONFIG;const delta=this.state.pendingWheelDelta;if(!delta){return;}
this.state.pendingWheelDelta=0;this.wheelAccumulator+=delta;const threshold=config.WHEEL.DELTA_THRESHOLD||(this.ITEM_HEIGHT*2);let steps=Math.trunc(this.wheelAccumulator/threshold);if(Math.abs(steps)<1){return;}
const now=Date.now();const dir=Math.sign(steps);const fastScroll=this.state.lastWheelAppliedTime&&(now-this.state.lastWheelAppliedTime<80)&&dir===this.state.lastWheelDir;let maxSteps=this.infinite?config.WHEEL.MAX_STEPS_PER_EVENT:config.WHEEL.NON_INFINITE_MAX_STEPS;if(fastScroll&&maxSteps){maxSteps=maxSteps*2;}
if(maxSteps){steps=Math.max(-maxSteps,Math.min(maxSteps,steps));}
this.wheelAccumulator-=steps*threshold;this.state.scrollY+=steps*this.ITEM_HEIGHT;this.state.scrollY=this.applyBoundary(this.state.scrollY);this.state.scrollY=this.snapToGrid(this.state.scrollY);this.updatePosition(config.ANIMATION.WHEEL_SCROLL,this.state.scrollY,'WHEEL');this.updateItems(this.state.scrollY);this.notifyChange();this.state.lastWheelAppliedTime=now;this.state.lastWheelDir=dir;clearTimeout(this.wheelAccumulatorTimer);this.wheelAccumulatorTimer=setTimeout(()=>{this.wheelAccumulator=0;},config.WHEEL.ACCUMULATOR_TIMEOUT);if(Math.abs(this.wheelAccumulator)>=threshold){this.scheduleWheelProcess();}}
handleTouchStart(e){this.state.startY=e.type==='touchstart'?e.touches[0].clientY:e.clientY;this.state.startTime=Date.now();this.state.moveY=0;this.state.hasMoved=false;if(e.type==='mousedown'){this.state.clickDown=true;}}
handleTouchMove(e){if(e.type==='touchmove'){e.preventDefault();this.state.curY=e.touches[0].clientY;}else{if(!this.state.clickDown)return;this.state.curY=e.clientY;}
this.state.moveY=this.state.curY-this.state.startY;if(Math.abs(this.state.moveY)>2){this.state.hasMoved=true;}
const distance=this.state.scrollY+this.state.moveY;this.updateItems();this.state.lastY=this.state.curY;this.updatePosition(WheelScroller.CONFIG.ANIMATION.TOUCH_SCROLL,distance);}
handleTouchEnd(e){const clientY=e.type==='touchend'?e.changedTouches[0].clientY:e.clientY;if(e.type==='mouseup'){if(!this.state.clickDown)return;this.state.clickDown=false;}
this.state.lastY=clientY;this.state.endTime=Date.now();if(this.state.hasMoved){this.applyInertia();this.notifyChange();}}
applyInertia(){const interval=this.state.endTime-this.state.startTime;const config=WheelScroller.CONFIG;let speed=config.ANIMATION.INERTIA_MIN;let addPos;let easingType='DEFAULT';const absMove=Math.abs(this.state.moveY);if(this.state.inertia&&interval<config.INERTIA.TIME_THRESHOLD&&absMove>0){speed=Math.abs(this.state.moveY/interval)*1000;speed=Math.max(config.ANIMATION.INERTIA_MIN,Math.min(config.ANIMATION.INERTIA_MAX,Math.round(speed)));addPos=(speed/config.INERTIA.SPEED_MULTIPLIER)*(this.state.moveY<0?-1:1);}else{addPos=this.state.moveY;this.state.inertia=true;speed=config.ANIMATION.SNAP;easingType='SNAP';}
if(absMove<this.ITEM_HEIGHT/2){addPos=0;speed=config.ANIMATION.SNAP;easingType='SNAP';}
this.state.scrollY+=this.snapToGrid(addPos);this.state.moveY=0;this.state.scrollY=this.applyBoundary(this.state.scrollY);const startTime=Date.now();const updateItems=()=>{const elapsed=Date.now()-startTime;if(elapsed<speed){this.updateItems();this.inertiaAnimationFrame=requestAnimationFrame(updateItems);}else{this.updateItems();this.inertiaAnimationFrame=null;}};this.inertiaAnimationFrame=requestAnimationFrame(updateItems);this.updatePosition(speed,this.state.scrollY,easingType);}
snapToGrid(pos){const rounded=Math.round(pos);const remainder=Math.round(rounded%this.ITEM_HEIGHT);const half=this.ITEM_HEIGHT/2;if(Math.abs(remainder)<half){return rounded-remainder;}
return rounded-remainder+(rounded>0?this.ITEM_HEIGHT:-this.ITEM_HEIGHT);}
updatePosition(duration,pos,easingType='DEFAULT'){const easingFunc=WheelScroller.CONFIG.EASING[easingType];this.scrollList.style.transition=duration===0?'none':`transform ${duration}ms ${easingFunc}`;this.scrollList.style.transform=`translate3d(0, ${pos + this.POSITION_OFFSET}px, 0)`;this._cachedPosition=pos+this.POSITION_OFFSET;this._isAnimating=duration>0;if(duration>0){setTimeout(()=>{this._isAnimating=false;},duration);}}
updateItems(forcePos){let currentPos;if(forcePos!==undefined){currentPos=forcePos;}else{currentPos=this.getCurrentPosition()-this.POSITION_OFFSET;}
const index=Math.round(-currentPos/this.ITEM_HEIGHT)-this.ITEM_SIZE;const diff=index-this.state.current;if(!diff)return;this.state.current=index;const len=this.data.length;const updates=[];this.items.forEach(item=>{let itemIndex=Number(item.getAttribute('data-index'))+diff;const update={element:item,index:itemIndex,visible:true,value:'',display:''};if(!this.infinite&&(itemIndex<0||itemIndex>=len)){update.visible=false;}else{const dataIdx=this.infinite?((itemIndex%len)+len)%len:itemIndex;update.value=this.data[dataIdx].value;update.display=this.data[dataIdx].display;}
updates.push(update);});requestAnimationFrame(()=>{updates.forEach(update=>{const item=update.element;item.setAttribute('data-index',update.index);if(!update.visible){item.style.opacity='0';item.textContent='';item.removeAttribute('data-val');}else{item.style.opacity='1';item.setAttribute('data-val',update.value);item.textContent=update.display;}});this.state.marginTop+=diff*this.ITEM_HEIGHT;this.scrollList.style.marginTop=`${this.state.marginTop}px`;});}
getCurrentPosition(){if(!this._isAnimating&&this._cachedPosition!==undefined){return this._cachedPosition;}
const transform=getComputedStyle(this.scrollList).transform;if(transform==='none'){return this._cachedPosition||0;}
const matrix=transform.match(/matrix.*\((.+)\)/);if(!matrix){return this._cachedPosition||0;}
const values=matrix[1].split(', ');return Number(values[13]||values[5])||0;}
getValue(){const pos=this.state.scrollY;const dataIndex=Math.round(-pos/this.ITEM_HEIGHT)-this.ITEM_SIZE+this.selectedIdx;const len=this.data.length;let index=(dataIndex%len+len)%len;return{value:this.data[index].value,display:this.data[index].display,dataIndex:dataIndex};}
notifyChange(){this.picker.updateResult(this.index,this.getValue());}
handleItemClick(e){const item=e.target.closest('li');if(!item||item.style.opacity==='0')return;const value=item.getAttribute('data-val');if(!value)return;if(this.inertiaAnimationFrame){cancelAnimationFrame(this.inertiaAnimationFrame);this.inertiaAnimationFrame=null;}
this.scrollTo(value);}
scrollTo(value){this.wheel.selected=value;const newSelectedIdx=this.getSelectedIndex();const diff=this.selectedIdx-newSelectedIdx;this.state.scrollY=-this.ITEM_HEIGHT*this.ITEM_SIZE+diff*this.ITEM_HEIGHT;this.updatePosition(WheelScroller.CONFIG.ANIMATION.SNAP,this.state.scrollY,'SNAP');this.updateItems(this.state.scrollY);this.notifyChange();}
updateData(newData){this.data=newData;this.wheel.data=newData;this.renderItems();this.scrollTo(this.picker.getResult(this.index).value);}
removeItems(values){const newData=this.data.filter(item=>!values.includes(item.value));this.updateData(newData);}
destroy(){if(this.wheelThrottleTimer){clearTimeout(this.wheelThrottleTimer);this.wheelThrottleTimer=null;}
if(this.wheelAccumulatorTimer){clearTimeout(this.wheelAccumulatorTimer);this.wheelAccumulatorTimer=null;}
if(this.inertiaAnimationFrame){cancelAnimationFrame(this.inertiaAnimationFrame);this.inertiaAnimationFrame=null;}
if(this.inertiaUpdateTimer){clearInterval(this.inertiaUpdateTimer);this.inertiaUpdateTimer=null;}
if(isPC()){this.element.removeEventListener('mousedown',this.eventHandlers.touchStart,false);if(this.scrollContainer){this.scrollContainer.removeEventListener('wheel',this.eventHandlers.wheel,false);}
document.removeEventListener('mousemove',this.eventHandlers.touchMove,false);document.removeEventListener('mouseup',this.eventHandlers.touchEnd,false);}else{this.element.removeEventListener('touchstart',this.eventHandlers.touchStart,false);this.element.removeEventListener('touchmove',this.eventHandlers.touchMove,false);this.element.removeEventListener('touchend',this.eventHandlers.touchEnd,false);this.element.removeEventListener('touchcancel',this.eventHandlers.touchEnd,false);}
if(this.scrollList){this.scrollList.removeEventListener('click',this.eventHandlers.itemClick,false);}
this.eventHandlers=null;this.scrollList=null;this.items=null;this.element=null;this.scrollContainer=null;}}
class PickerBase{constructor(selector,options){this.options=extend({container:'body',display:'bottom',position:'bottom-left',headTitle:'',format:'YYYY-MM-DD HH:mm:ss',wheels:[],showNowBtn:false,init:()=>{},getResult:()=>{},save:()=>{},cancel:()=>{},now:()=>{}},options);this.targets=document.querySelectorAll(selector);this.currentTarget=null;this.scrollers=[];this.results=[];this.bindTargets();}
bindTargets(){this.targets.forEach(target=>{this.initTarget(target);this.bindTargetEvents(target);});}
initTarget(target){const isInput=target.matches('input, textarea');if(isInput){target.setAttribute('unselectable','on');if(!isPC()){target.setAttribute('readonly','true');target.setAttribute('inputmode','none');target.setAttribute('autocomplete','off');target.setAttribute('autocorrect','off');target.setAttribute('autocapitalize','off');target.setAttribute('spellcheck','false');target.style.cursor='pointer';target.style.userSelect='none';target.style.webkitUserSelect='none';if(!target.getAttribute('placeholder')){target.setAttribute('placeholder',' ');}}
if(target.value){target.classList.add('has-value');}}
const value=isInput?target.value:target.textContent;if(value){const numbers=value.match(/\d+/g);if(numbers){target.setAttribute('data-value',numbers.join(','));}}}
bindTargetEvents(target){const isInput=target.matches('input, textarea');const showPicker=(e)=>{e.preventDefault();if(document.querySelector('.p-scroll')){return;}
this.show(target);};target.addEventListener('click',showPicker,false);if(isInput){target.addEventListener('focus',showPicker,false);}}
show(target){this.currentTarget=target;const wheels=this.prepareWheels(target);this.render(wheels);this.initScrollers(wheels);this.bindPickerEvents();if(this.options.display==='auto'&&isPC()){this.positionPicker(target);}
this.options.init({result:this.results,scrollEvt:this.scrollers});}
prepareWheels(target){const wheels=JSON.parse(JSON.stringify(this.options.wheels));const savedValue=target.getAttribute('data-value');if(savedValue){const values=savedValue.split(',');values.forEach((val,i)=>{if(wheels[i]){wheels[i].selected=val;}});}
return wheels;}
render(wheels){const html=createPickerHTML({wheels,display:this.options.display,headTitle:this.options.headTitle,showNowBtn:this.options.showNowBtn});const wrapper=createElement(`<div class="p-scroll">${html}</div>`);document.querySelector(this.options.container).appendChild(wrapper);}
initScrollers(wheels){const items=document.querySelectorAll('.p-select-item');this.scrollers=[];this.results=[];items.forEach((element,index)=>{const scroller=new WheelScroller(element,wheels[index],index,this);this.scrollers.push(scroller);this.results.push(scroller.getValue());});}
bindPickerEvents(){const submitBtn=document.querySelector('.p-select-submit-btn');const cancelBtn=document.querySelector('.p-select-cancel-btn');const nowBtn=document.querySelector('.p-select-now-btn');const mask=document.querySelector('.p-select-mask');const scroll=document.querySelector('.p-scroll');submitBtn?.addEventListener('click',()=>this.handleSave(),false);cancelBtn?.addEventListener('click',()=>this.handleCancel(),false);nowBtn?.addEventListener('click',()=>this.handleNow(),false);mask?.addEventListener('click',()=>this.handleCancel(),false);scroll?.addEventListener('touchmove',(e)=>e.preventDefault(),{passive:false});}
positionPicker(target){const wrapper=document.querySelector('.p-select-wrap');const rect=target.getBoundingClientRect();const pickerHeight=300;const pickerWidth=320;let top,left;const position=this.options.position;if(position.includes('bottom')){top=rect.bottom+pickerHeight<window.innerHeight?rect.bottom+5:rect.top-pickerHeight-5;}else{top=rect.top-pickerHeight>0?rect.top-pickerHeight-5:rect.bottom+5;}
if(position.includes('left')){left=Math.min(rect.left,window.innerWidth-pickerWidth-10);}else{left=Math.max(10,rect.right-pickerWidth);}
wrapper.style.position='fixed';wrapper.style.top=`${top}px`;wrapper.style.left=`${left}px`;wrapper.style.transform='none';}
handleSave(){const values=this.results.map(r=>r.value);const formatted=formatDateTime(this.results,this.options.format);this.currentTarget.setAttribute('data-value',values.join(','));const isInput=this.currentTarget.matches('input, textarea');if(isInput){this.currentTarget.value=formatted;this.currentTarget.classList.add('has-value');this.currentTarget.dispatchEvent(new Event('input',{bubbles:true}));this.currentTarget.dispatchEvent(new Event('change',{bubbles:true}));}else{this.currentTarget.textContent=formatted;}
this.options.getResult({result:this.results,scrollEvt:this.scrollers});this.options.save(formatted,this.currentTarget);this.destroy();}
handleCancel(){this.options.cancel();this.destroy();}
handleNow(){this.options.now({result:this.results,scrollEvt:this.scrollers,target:this.currentTarget});}
updateResult(index,value){this.results[index]=value;this.options.getResult({result:this.results,scrollEvt:this.scrollers,scrollIdx:index});}
getResult(index){return this.results[index]||{};}
destroy(){const scroll=document.querySelector('.p-scroll');removeElement(scroll);this.scrollers.forEach(scroller=>{if(scroller&&typeof scroller.destroy==='function'){scroller.destroy();}});this.scrollers=[];this.results=[];}}
class DateTimePicker{static dataCache={month:null,day:null,hour:null,minute:null,years:{}};constructor(selector,options){this.options=extend({container:'body',display:'bottom',position:'bottom-left',headTitle:'',showLabel:true,showNowBtn:true,date:true,time:true,format:'YYYY-MM-DD HH:mm:ss',beginYear:new Date().getFullYear()-100,endYear:new Date().getFullYear()+100,save:()=>{},cancel:()=>{}},options);this.createPicker(selector);}
createPicker(selector){const wheels=this.createWheels();new PickerBase(selector,{...this.options,wheels,init:(rs)=>this.handleInit(rs),getResult:(rs)=>this.handleUpdate(rs),now:(rs)=>this.handleNow(rs)});}
createWheels(){const now=new Date();const labels=this.options.showLabel?['年','月','日','时','']:['','','','',''];const wheels=[{infinite:false,selected:padZero(now.getFullYear()),label:labels[0],data:this.generateYearData()},{infinite:true,selected:padZero(now.getMonth()+1),label:labels[1],data:this.generateMonthData()},{infinite:true,selected:padZero(now.getDate()),label:labels[2],data:this.generateDayData()},{infinite:true,selected:padZero(now.getHours()),label:labels[3],data:this.generateHourData()},{infinite:true,selected:padZero(now.getMinutes()),label:labels[4],data:this.generateMinuteData()}];return this.filterWheels(wheels);}
filterWheels(wheels){let filtered=wheels;if(!this.options.date){filtered=filtered.slice(3);}
if(!this.options.time){filtered=filtered.slice(0,3);if(filtered.length>0){filtered[filtered.length-1].label='';}}
return filtered;}
generateYearData(){const cacheKey=`${this.options.beginYear}-${this.options.endYear}`;if(DateTimePicker.dataCache.years[cacheKey]){return DateTimePicker.dataCache.years[cacheKey];}
const data=[];for(let i=this.options.beginYear;i<=this.options.endYear;i++){data.push({value:padZero(i),display:padZero(i)});}
DateTimePicker.dataCache.years[cacheKey]=data;return data;}
generateMonthData(){if(DateTimePicker.dataCache.month){return DateTimePicker.dataCache.month;}
const data=Array.from({length:12},(_,i)=>{const val=padZero(i+1);return{value:val,display:val};});DateTimePicker.dataCache.month=data;return data;}
generateDayData(){if(DateTimePicker.dataCache.day){return DateTimePicker.dataCache.day;}
const data=Array.from({length:31},(_,i)=>{const val=padZero(i+1);return{value:val,display:val};});DateTimePicker.dataCache.day=data;return data;}
generateHourData(){if(DateTimePicker.dataCache.hour){return DateTimePicker.dataCache.hour;}
const data=Array.from({length:24},(_,i)=>{const val=padZero(i);return{value:val,display:val};});DateTimePicker.dataCache.hour=data;return data;}
generateMinuteData(){if(DateTimePicker.dataCache.minute){return DateTimePicker.dataCache.minute;}
const data=Array.from({length:60},(_,i)=>{const val=padZero(i);return{value:val,display:val};});DateTimePicker.dataCache.minute=data;return data;}
handleInit(rs){if(this.options.date&&rs.scrollEvt.length>=3){const year=rs.result[0].value;const month=rs.result[1].value;this.updateDays(rs.scrollEvt[2],year,month);}}
handleUpdate(rs){if(this.options.date&&(rs.scrollIdx===0||rs.scrollIdx===1)){const year=rs.result[0].value;const month=rs.result[1].value;this.updateDays(rs.scrollEvt[2],year,month);}}
handleNow(rs){const now=new Date();const scrollers=rs.scrollEvt;if(this.options.date&&this.options.time){scrollers[0].scrollTo(padZero(now.getFullYear()));scrollers[1].scrollTo(padZero(now.getMonth()+1));scrollers[2].scrollTo(padZero(now.getDate()));scrollers[3].scrollTo(padZero(now.getHours()));scrollers[4].scrollTo(padZero(now.getMinutes()));}else if(this.options.date){scrollers[0].scrollTo(padZero(now.getFullYear()));scrollers[1].scrollTo(padZero(now.getMonth()+1));scrollers[2].scrollTo(padZero(now.getDate()));}else if(this.options.time){scrollers[0].scrollTo(padZero(now.getHours()));scrollers[1].scrollTo(padZero(now.getMinutes()));}}
updateDays(dayScroller,year,month){const maxDays=getDaysInMonth(year,month);const validDays=Array.from({length:31},(_,i)=>i+1).filter(day=>day<=maxDays).map(day=>padZero(day));const invalidDays=Array.from({length:31},(_,i)=>padZero(i+1)).filter(day=>!validDays.includes(day));const allDays=Array.from({length:31},(_,i)=>{const val=padZero(i+1);return{value:val,display:val};});dayScroller.updateData(allDays);if(invalidDays.length>0){dayScroller.removeItems(invalidDays);}}}
return{dateTime:(selector,options)=>new DateTimePicker(selector,options),picker:(selector,options)=>new PickerBase(selector,options),DateTimePicker,PickerBase};})();;(()=>{const container=document.getElementById('starsContainer');const numStars=50;let starsCreated=false;function shouldShowStars(){return!document.documentElement.classList.contains('light');}
function createStars(){if(starsCreated)return;for(let i=0;i<numStars;i++){const star=document.createElement('div');star.className='star';const size=Math.random()>0.95?3:Math.random()>0.7?2:1;star.classList.add('size'+size);if(size>=2&&Math.random()>0.5){const colors=['color1','color2','color3'];star.classList.add(colors[Math.floor(Math.random()*colors.length)]);}
star.style.left=Math.random()*100+'%';star.style.top=Math.random()*100+'%';const duration=3+Math.random()*9;star.style.animationDuration=duration+'s';star.style.animationDelay=Math.random()*duration+'s';const driftX=(Math.random()-0.5)*0.03;const driftY=(Math.random()-0.5)*0.03;let posX=parseFloat(star.style.left);let posY=parseFloat(star.style.top);function drift(){posX+=driftX;posY+=driftY;if(posX<0)posX=100;if(posX>100)posX=0;if(posY<0)posY=100;if(posY>100)posY=0;star.style.left=posX+'%';star.style.top=posY+'%';requestAnimationFrame(drift);}
drift();container.appendChild(star);}
starsCreated=true;}
function initStars(){if(!shouldShowStars()){return;}
createStars();setTimeout(()=>{container.classList.add('stars-loaded');},100);}
function watchThemeChange(){const observer=new MutationObserver((mutations)=>{mutations.forEach((mutation)=>{if(mutation.type==='attributes'&&mutation.attributeName==='class'){const isDarkTheme=shouldShowStars();if(isDarkTheme){if(!starsCreated){createStars();}
container.classList.add('stars-loaded');}else{container.classList.remove('stars-loaded');}}});});observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});}
function scheduleShootingStar(){const delay=4000+Math.random()*11000;setTimeout(()=>{scheduleShootingStar();},delay);}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',()=>{initStars();watchThemeChange();});}else{initStars();watchThemeChange();}
scheduleShootingStar();})();;const guideModule=(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);const CONFIG={STORAGE_KEY_COMPLETED:'guide_completed',STORAGE_KEY_SKIPPED:'guide_skipped',STORAGE_KEY_CURRENT_STEP:'guide_current_step',STORAGE_KEY_CURRENT_PAGE:'guide_current_page',SESSION_KEY_PROMPT_SHOWN_PAGE:'guide_prompt_shown_page',WAIT_FOR_ELEMENT_TIMEOUT:5000,SW_STABLE_TIMEOUT:3000,OVERLAY_CLASS:'guide-overlay',ALLOWED_URL_PATTERN:new RegExp('^('+window.location.origin+')?/[^/]')};let steps=[];let currentStepIndex=0;let isGuideActive=false;let highlightElement=null;let overlayElement=null;let holeRect=null;let waitTimer=null;let conditionTimer=null;let conditionObserver=null;let conditionTimeoutId=null;let throttledUpdateOverlay=null;let mutationObserver=null;let guideButton=null;let guideButtonClickHandler=null;let overlayInitialized=false;const eventListeners={};function on(eventName,callback){if(!eventListeners[eventName]){eventListeners[eventName]=[];}
eventListeners[eventName].push(callback);}
function emit(eventName,data){if(!eventListeners[eventName])return;eventListeners[eventName].forEach(function(callback){try{callback(data);}catch(error){console.error('guideModule: 事件回调执行错误',error);}});}
function off(eventName,callback){if(!eventListeners[eventName])return;const index=eventListeners[eventName].indexOf(callback);if(index>-1){eventListeners[eventName].splice(index,1);}}
function isUrlSafe(url){try{const parsedUrl=new URL(url,window.location.origin);return parsedUrl.origin===window.location.origin;}catch(e){return url.startsWith('/')&&!url.includes('//');}}
function rafThrottle(func){let rafId=null;let lastArgs=null;return function(){lastArgs=arguments;if(rafId===null){rafId=requestAnimationFrame(function(){rafId=null;func.apply(this,lastArgs);});}};}
function normalizePath(path){if(!path||path===''){return'/';}
if(path.length>1&&path.endsWith('/')){return path.slice(0,-1);}
return path;}
function init(){bindEvents();const currentPage=normalizePath(window.location.pathname);const savedPage=normalizePath(localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_PAGE));const savedStepId=localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_STEP);if(savedPage&&savedStepId){isGuideActive=false;tryResumeGuide(savedPage,savedStepId,currentPage);}else{if(shouldShowGuidePrompt()){scheduleGuidePrompt();}}}
function scheduleGuidePrompt(){if(!('serviceWorker'in navigator)){showGuidePrompt();return;}
if(navigator.serviceWorker.controller){showGuidePrompt();return;}
let promptShown=false;let fallbackTimer=null;function cleanup(){if(fallbackTimer){clearTimeout(fallbackTimer);fallbackTimer=null;}
navigator.serviceWorker.removeEventListener('controllerchange',handleControllerChange);}
function showPromptOnce(){if(promptShown){return;}
promptShown=true;cleanup();if(shouldShowGuidePrompt()){showGuidePrompt();}}
function handleControllerChange(){cleanup();}
navigator.serviceWorker.addEventListener('controllerchange',handleControllerChange);fallbackTimer=setTimeout(function(){showPromptOnce();},CONFIG.SW_STABLE_TIMEOUT);}
function tryResumeGuide(savedPage,savedStepId,currentPage){let stepsRegistered=false;let resumeTimer=null;const MAX_WAIT_TIME=10000;function cleanup(){if(resumeTimer){clearTimeout(resumeTimer);resumeTimer=null;}
off('stepsRegistered',onStepsRegistered);}
function onStepsRegistered(){if(stepsRegistered)return;stepsRegistered=true;if(savedPage===currentPage){startFrom(savedStepId);}else{const currentStep=steps.find(function(s){return normalizePath(s.page||window.location.pathname)===currentPage;});if(currentStep){startFrom(currentStep.id);}else{console.log('guideModule: 当前页面无引导步骤，等待页面跳转 savedPage='+savedPage+', currentPage='+currentPage);}}
cleanup();}
on('stepsRegistered',onStepsRegistered);if(steps.length>0){onStepsRegistered();return;}
resumeTimer=setTimeout(function(){if(!stepsRegistered){console.warn('guideModule: 等待步骤注册超时');cleanup();}},MAX_WAIT_TIME);}
function bindEvents(){guideButton=document.getElementById('guide');if(guideButton){guideButtonClickHandler=function(){const event=new CustomEvent('guideButtonClick',{detail:{}});document.dispatchEvent(event);};guideButton.addEventListener('click',guideButtonClickHandler);}}
function unbindEvents(){if(guideButton&&guideButtonClickHandler){guideButton.removeEventListener('click',guideButtonClickHandler);guideButton=null;guideButtonClickHandler=null;}}
function shouldShowGuidePrompt(){const completed=localStorage.getItem(CONFIG.STORAGE_KEY_COMPLETED);const skipped=localStorage.getItem(CONFIG.STORAGE_KEY_SKIPPED);const currentStep=localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_STEP);const currentPage=localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);const promptShownPage=sessionStorage.getItem(CONFIG.SESSION_KEY_PROMPT_SHOWN_PAGE);const normalizedCurrentPath=normalizePath(window.location.pathname);if(currentStep&&currentPage){return false;}
if(promptShownPage===normalizedCurrentPath){return false;}
return!completed&&!skipped;}
function showGuidePrompt(){sessionStorage.setItem(CONFIG.SESSION_KEY_PROMPT_SHOWN_PAGE,normalizePath(window.location.pathname));messageModule.show({title:'新手引导',content:'是否需要新手引导？\n\n如果您对六爻、大六壬、奇门遁甲等预测术数不太了解，或第一次使用本网站，建议您开启新手引导。',showCancel:true,showClose:true,confirmText:'请引导我',cancelText:'我很专业，不再询问',onConfirm:function(){start();},onCancel:function(){skipGuide();}});}
function skipGuide(){localStorage.setItem(CONFIG.STORAGE_KEY_SKIPPED,'true');}
function completeGuide(){localStorage.setItem(CONFIG.STORAGE_KEY_COMPLETED,'true');localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_STEP);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);}
function registerSteps(stepList){if(!Array.isArray(stepList)){console.error('guideModule: 步骤列表必须是数组');return;}
for(let i=0;i<stepList.length;i++){const step=stepList[i];if(!step||typeof step!=='object'){console.error('guideModule: 步骤 '+i+' 不是有效的对象');return;}
if(!step.id||typeof step.id!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 id');return;}
if(!step.target||typeof step.target!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 target');return;}
if(!step.title||typeof step.title!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 title');return;}
if(!step.content||typeof step.content!=='string'){console.error('guideModule: 步骤 '+i+' 缺少有效的 content');return;}
if(step.actionUrl&&!isUrlSafe(step.actionUrl)){console.error('guideModule: 步骤 '+i+' 的 actionUrl 不安全: '+step.actionUrl);return;}}
const wasEmpty=steps.length===0;steps=stepList;if(wasEmpty&&steps.length>0){emit('stepsRegistered',steps);}}
function start(){if(steps.length===0){console.warn('guideModule: 没有注册任何引导步骤');return;}
startFrom(steps[0].id);}
function startFrom(stepId){if(isGuideActive){console.log('guideModule: 引导已在进行中，忽略重复调用');return;}
const index=steps.findIndex(function(s){return s.id===stepId;});if(index===-1){console.error('guideModule: 未找到步骤 '+stepId);return;}
currentStepIndex=index;isGuideActive=true;const currentStep=steps[currentStepIndex];localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,stepId);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,normalizePath(currentStep.page||window.location.pathname));showStep(currentStep);}
function showStep(step){if(!step){finishGuide();return;}
if(step.action==='click'&&step.actionTarget){const actionElement=safeQuerySelector(step.actionTarget);if(actionElement){handleActionBeforeGuide(step,actionElement);return;}else{console.warn('guideModule: 未找到操作目标元素 '+step.actionTarget);nextStep();return;}}
waitForElement(step.target,function(element){if(!element){console.warn('guideModule: 未找到目标元素 '+step.target);nextStep();return;}
highlightTarget(element,function(){showGuideBox(step,element);});});}
function safeQuerySelector(selector){if(selector.startsWith('#')&&selector.length>1){const idValue=selector.slice(1);if(/^\d/.test(idValue)){return document.querySelector('[id="'+idValue+'"]');}}
return document.querySelector(selector);}
function waitForElement(selector,callback){const element=safeQuerySelector(selector);if(element){callback(element);return;}
if(mutationObserver){mutationObserver.disconnect();mutationObserver=null;}
let found=false;let timeoutId=null;function cleanup(){if(mutationObserver){mutationObserver.disconnect();mutationObserver=null;}
if(timeoutId){clearTimeout(timeoutId);timeoutId=null;}}
mutationObserver=new MutationObserver(function(){if(found)return;const el=safeQuerySelector(selector);if(el){found=true;cleanup();callback(el);}});mutationObserver.observe(document.body||document.documentElement,{childList:true,subtree:true});timeoutId=setTimeout(function(){if(!found){found=true;cleanup();console.warn('guideModule: 等待元素超时 '+selector);callback(null);}},CONFIG.WAIT_FOR_ELEMENT_TIMEOUT);}
function highlightTarget(element,onComplete){removeHighlight();highlightElement=element;throttledUpdateOverlay=rafThrottle(updateOverlay);initOverlay();scrollIntoViewIfNeeded(element,function(){updateOverlay();window.addEventListener('resize',throttledUpdateOverlay);window.addEventListener('scroll',throttledUpdateOverlay,true);if(onComplete){onComplete();}});}
function isElementInViewport(el){const rect=el.getBoundingClientRect();const viewportWidth=window.innerWidth||document.documentElement.clientWidth;const viewportHeight=window.innerHeight||document.documentElement.clientHeight;const isInViewport=(rect.top<viewportHeight&&rect.bottom>0&&rect.left<viewportWidth&&rect.right>0);if(!isInViewport){return false;}
let parent=el.parentElement;while(parent&&parent!==document.body){const parentRect=parent.getBoundingClientRect();const parentStyle=window.getComputedStyle(parent);const hasOverflow=parentStyle.overflow==='auto'||parentStyle.overflow==='scroll'||parentStyle.overflowY==='auto'||parentStyle.overflowY==='scroll'||parentStyle.overflowX==='auto'||parentStyle.overflowX==='scroll';if(hasOverflow){const isAboveParent=rect.top<parentRect.top;const isBelowParent=rect.bottom>parentRect.bottom;const isLeftOfParent=rect.left<parentRect.left;const isRightOfParent=rect.right>parentRect.right;if(isAboveParent||isBelowParent||isLeftOfParent||isRightOfParent){return false;}}
parent=parent.parentElement;}
return true;}
function findScrollContainer(element){let parent=element.parentElement;while(parent&&parent!==document.body){const style=window.getComputedStyle(parent);const hasOverflow=style.overflow==='auto'||style.overflow==='scroll'||style.overflowY==='auto'||style.overflowY==='scroll'||style.overflowX==='auto'||style.overflowX==='scroll';if(hasOverflow){return parent;}
parent=parent.parentElement;}
return null;}
function scrollIntoViewIfNeeded(element,callback){if(isElementInViewport(element)){callback();return;}
const scrollContainer=findScrollContainer(element);const elementRect=element.getBoundingClientRect();if(scrollContainer){const containerRect=scrollContainer.getBoundingClientRect();const scrollTop=scrollContainer.scrollTop;const scrollLeft=scrollContainer.scrollLeft;let targetScrollTop=scrollTop;let targetScrollLeft=scrollLeft;if(elementRect.top<containerRect.top){targetScrollTop=scrollTop-(containerRect.top-elementRect.top)-10;}else if(elementRect.bottom>containerRect.bottom){targetScrollTop=scrollTop+(elementRect.bottom-containerRect.bottom)+10;}
if(elementRect.left<containerRect.left){targetScrollLeft=scrollLeft-(containerRect.left-elementRect.left)-10;}else if(elementRect.right>containerRect.right){targetScrollLeft=scrollLeft+(elementRect.right-containerRect.right)+10;}
scrollContainer.scrollTo({top:targetScrollTop,left:targetScrollLeft,behavior:'smooth'});waitForScrollEnd(scrollContainer,callback);}else{element.scrollIntoView({behavior:'smooth',block:'center',inline:'center'});waitForScrollEnd(document.documentElement,callback);}}
function waitForScrollEnd(scrollElement,callback){let lastScrollTop=scrollElement.scrollTop;let lastScrollLeft=scrollElement.scrollLeft;let stableCount=0;const STABLE_FRAMES_NEEDED=3;const MAX_WAIT_TIME=1000;let startTime=Date.now();let rafId=null;function checkScrollEnd(){if(Date.now()-startTime>MAX_WAIT_TIME){if(rafId){cancelAnimationFrame(rafId);rafId=null;}
callback();return;}
const currentScrollTop=scrollElement.scrollTop;const currentScrollLeft=scrollElement.scrollLeft;if(currentScrollTop===lastScrollTop&&currentScrollLeft===lastScrollLeft){stableCount++;if(stableCount>=STABLE_FRAMES_NEEDED){if(rafId){cancelAnimationFrame(rafId);rafId=null;}
callback();return;}}else{stableCount=0;lastScrollTop=currentScrollTop;lastScrollLeft=currentScrollLeft;}
rafId=requestAnimationFrame(checkScrollEnd);}
rafId=requestAnimationFrame(checkScrollEnd);}
function initOverlay(){if(overlayInitialized){return;}
if(!overlayElement){overlayElement=document.createElement('div');overlayElement.className=CONFIG.OVERLAY_CLASS;overlayElement.style.position='fixed';overlayElement.style.top='0';overlayElement.style.left='0';overlayElement.style.width='100%';overlayElement.style.height='100%';overlayElement.style.zIndex='9998';overlayElement.style.pointerEvents='none';document.body.appendChild(overlayElement);}
const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class',CONFIG.OVERLAY_CLASS+'-svg');svg.style.position='fixed';svg.style.top='0';svg.style.left='0';svg.style.width='100%';svg.style.height='100%';svg.style.zIndex='9998';svg.style.pointerEvents='none';const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');const mask=document.createElementNS('http://www.w3.org/2000/svg','mask');mask.setAttribute('id','guide-mask');const whiteRect=document.createElementNS('http://www.w3.org/2000/svg','rect');whiteRect.setAttribute('fill','white');whiteRect.setAttribute('x','0');whiteRect.setAttribute('y','0');whiteRect.setAttribute('width','100%');whiteRect.setAttribute('height','100%');holeRect=document.createElementNS('http://www.w3.org/2000/svg','rect');holeRect.setAttribute('id','guide-hole');holeRect.setAttribute('fill','black');holeRect.setAttribute('x','0');holeRect.setAttribute('y','0');holeRect.setAttribute('width','0');holeRect.setAttribute('height','0');const overlayRect=document.createElementNS('http://www.w3.org/2000/svg','rect');overlayRect.setAttribute('fill','rgba(0, 0, 0, 0.35)');overlayRect.setAttribute('x','0');overlayRect.setAttribute('y','0');overlayRect.setAttribute('width','100%');overlayRect.setAttribute('height','100%');overlayRect.setAttribute('mask','url(#guide-mask)');mask.appendChild(whiteRect);mask.appendChild(holeRect);defs.appendChild(mask);svg.appendChild(defs);svg.appendChild(overlayRect);overlayElement.appendChild(svg);overlayInitialized=true;}
function updateOverlay(){if(!highlightElement||!holeRect)return;const rect=highlightElement.getBoundingClientRect();holeRect.setAttribute('x',rect.left);holeRect.setAttribute('y',rect.top);holeRect.setAttribute('width',rect.width);holeRect.setAttribute('height',rect.height);overlayElement.style.display='block';}
function removeHighlight(){if(throttledUpdateOverlay){window.removeEventListener('resize',throttledUpdateOverlay);window.removeEventListener('scroll',throttledUpdateOverlay,true);throttledUpdateOverlay=null;}
highlightElement=null;if(overlayElement){overlayElement.style.display='none';}
if(mutationObserver){mutationObserver.disconnect();mutationObserver=null;}
if(conditionObserver){conditionObserver.disconnect();conditionObserver=null;}
if(conditionTimeoutId){clearTimeout(conditionTimeoutId);conditionTimeoutId=null;}
if(waitTimer){clearInterval(waitTimer);waitTimer=null;}
if(conditionTimer){clearInterval(conditionTimer);conditionTimer=null;}}
function showGuideBox(step,targetElement){const buttons=[];const stepNumber=currentStepIndex+1;const totalSteps=steps.length;const stepInfo=' ('+stepNumber+'/'+totalSteps+')';if(currentStepIndex>0){buttons.push({text:'上一步',class:'btn-secondary',onClick:function(){previousStep();}});}
const isLastStep=currentStepIndex===steps.length-1;buttons.push({text:isLastStep?'完成':'下一步',class:'btn-primary',onClick:function(){nextStep();}});if(!isLastStep){buttons.push({text:'跳过引导',class:'btn-link',onClick:function(){completeGuide();hideGuideBox();removeHighlight();}});}
messageModule.show({title:step.title+stepInfo,content:step.content,showCancel:false,showClose:false,target:targetElement,position:step.position||'auto',offset:15,isHtml:true,customButtons:buttons});}
function hideGuideBox(){messageModule.hide();}
function handleActionBeforeGuide(step,actionElement){simulateClick(actionElement);if(step.actionUrl){if(!isUrlSafe(step.actionUrl)){console.error('guideModule: 不安全的跳转URL '+step.actionUrl);nextStep();return;}
const currentIndex=steps.findIndex(function(s){return s.id===step.id;});if(currentIndex>=0&&currentIndex<steps.length-1){const nextStepObj=steps[currentIndex+1];localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,nextStepObj.id);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,normalizePath(nextStepObj.page||step.actionUrl));}else{localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_STEP);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);}
setTimeout(function(){window.location.href=step.actionUrl;},100);}else if(step.waitForSelector&&step.waitForSelector.length>0){const selectorToWait=step.waitForSelector;waitForCondition(selectorToWait,function(){setTimeout(function(){waitForElement(step.target,function(element){if(!element){console.warn('guideModule: 未找到目标元素 '+step.target);nextStep();return;}
highlightTarget(element,function(){showGuideBox(step,element);});});},300);});}else{setTimeout(function(){waitForElement(step.target,function(element){if(!element){console.warn('guideModule: 未找到目标元素 '+step.target);nextStep();return;}
highlightTarget(element,function(){showGuideBox(step,element);});});},500);}}
function simulateClick(element){const eventInit={bubbles:true,cancelable:true,view:window};const events=[new MouseEvent('mousedown',eventInit),new MouseEvent('mouseup',eventInit),new MouseEvent('click',eventInit)];events.forEach(function(event){element.dispatchEvent(event);});return true;}
function waitForCondition(selectorCondition,callback){if(conditionObserver){conditionObserver.disconnect();conditionObserver=null;}
if(conditionTimeoutId){clearTimeout(conditionTimeoutId);conditionTimeoutId=null;}
const element=safeQuerySelector(selectorCondition);if(element){callback();return;}
let found=false;function cleanup(){if(conditionObserver){conditionObserver.disconnect();conditionObserver=null;}
if(conditionTimeoutId){clearTimeout(conditionTimeoutId);conditionTimeoutId=null;}}
conditionObserver=new MutationObserver(function(){if(found)return;const el=safeQuerySelector(selectorCondition);if(el){found=true;cleanup();callback();}});conditionObserver.observe(document.body||document.documentElement,{childList:true,subtree:true});conditionTimeoutId=setTimeout(function(){if(!found){found=true;cleanup();console.warn('guideModule: 等待条件超时: '+selectorCondition);callback();}},CONFIG.WAIT_FOR_ELEMENT_TIMEOUT);}
function nextStep(){hideGuideBox();removeHighlight();currentStepIndex++;if(currentStepIndex>=steps.length){finishGuide();}else{let nextStepObj=steps[currentStepIndex];const currentPage=normalizePath(window.location.pathname);const nextPage=normalizePath(nextStepObj.page||currentPage);if(nextPage!==currentPage){localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,nextStepObj.id);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,nextPage);window.location.href=nextPage;}else{localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,nextStepObj.id);showStep(nextStepObj);}}}
function previousStep(){hideGuideBox();removeHighlight();currentStepIndex--;if(currentStepIndex<0){currentStepIndex=0;}
let prevStep=steps[currentStepIndex];const currentPage=normalizePath(window.location.pathname);const prevPage=normalizePath(prevStep.page||currentPage);if(prevPage!==currentPage){localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,prevStep.id);localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_PAGE,prevPage);window.location.href=prevPage;}else{localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_STEP,prevStep.id);showStep(prevStep);}}
function finishGuide(){hideGuideBox();removeHighlight();completeGuide();messageModule.show({title:'引导完成',content:'新手引导已完成！',showCancel:false,confirmText:'开始使用',onConfirm:()=>{messageModule.hide();isGuideActive=false;},});}
function resetGuide(){localStorage.removeItem(CONFIG.STORAGE_KEY_COMPLETED);localStorage.removeItem(CONFIG.STORAGE_KEY_SKIPPED);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_STEP);localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_PAGE);sessionStorage.removeItem(CONFIG.SESSION_KEY_PROMPT_SHOWN_PAGE);isGuideActive=false;currentStepIndex=0;highlightElement=null;removeHighlight();unbindEvents();}
return{registerSteps:registerSteps,start:start,startFrom:startFrom,reset:resetGuide,skip:skipGuide};})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);const CONFIG={HOME_PAGE:'/',LIUYAO_PAGE:'/liuyao/',LIUREN_PAGE:'/liuren/',QIMEN_PAGE:'/qimen/',SQUARE_PAGE:'/case-square/',};function normalizePath(path){if(!path||path===''){return'/';}
if(path.length>1&&path.endsWith('/')){return path.slice(0,-1);}
return path;}
const homeSteps=[{id:'index-1',target:'#logo',title:'欢迎来到灵爻妙解',content:'这是一个运用了ai agent、工作流、知识库、mcp服务的专业解读平台，提供六爻、六壬、奇门遁甲等传统预测服务。',position:'bottom',page:CONFIG.HOME_PAGE},{id:'home-2',target:'#logo',title:'功能导航菜单',content:'这里包含了所有主要功能入口,'+'<br>点击【灵爻妙解】的图标，可唤出左侧抽屉菜单进行页面跳转。',position:'auto',action:"click",actionTarget:"#logo",page:CONFIG.HOME_PAGE},{id:'home-3',target:'#theme-btn',title:'主题切换',content:'这是主题切换按钮，'+'<br>点击可切换两种主题。'+'<br>您可以根据你的喜好自行切换黑白两种主题',position:'auto',action:"click",actionTarget:"#theme-btn",page:CONFIG.HOME_PAGE},{id:'home-4',target:'#notice-btn',title:'公告中心',content:'这里是公告中心，'+'<br>如果网站有重要的变动会在此处进行通知。',position:'auto',action:"click",actionTarget:"#theme-btn",page:CONFIG.HOME_PAGE},{id:'home-5',target:'#logout-menu',title:'登陆与注册',content:'这里是登陆、注册、用户名显示区域。'+'<br>登陆后将会变成你的用户名，点击用户名按钮可以唤出个人相关的菜单。'+'<br>签到、邀请、个人卦例、余额显示等都可以通过唤出个人菜单直接跳转。',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-6',target:'#xiaolinger',title:'小灵儿入口',content:'这里是小灵儿会话模式入口。'+'<br>如果你对六爻六壬奇门太乙完全不不了解。'+'<br>推荐直接使用小灵儿会话模式。'+'<br>如果你懂，则推荐从后面入口直接进入,'+'<br>能自定义排盘，且速度更快',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-7',target:'#liuyao_card',title:'六爻入口',content:'六爻如同“占卜快照”，擅长解答具体的单一问题。'+'<br><strong>核心特点是：问题具体、答案明确、时效性强。</strong>'+'<br>✓ 结果有清晰的吉凶成败判断。'+'<br>✓ 可预测短期内事情的发展和时间。'+'<br>✓ 能看事情的大致走向和结果。'+'<br><strong>适合提问：</strong>'+'<br>• 我这次面试能通过吗？'+'<br>• 丢失的物品能找到吗？大概在哪里？'+'<br>• 这次投资是赚是赔？'+'<br>• 我近期身体某处不适，原因是什么？'+'<br>• 我今年的整体运势如何？',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-8',target:'#liuren_card',title:'大六壬入口',content:'大六壬被称为“人事之王”，如同“人事显微镜”，擅长剖析事情复杂的过程、细节和人际关系。'+'<br><strong>核心特点是：细腻如丝、过程清晰、擅长归因。</strong>'+'<br>✓ 能层层推演事件发展的完整链条和细节。'+'<br>✓ 特别擅长分析人际关系、幕后隐情和多方互动。'+'<br>✓ 能精准定位问题根源和关键人物。'+'<br><strong>适合提问：</strong>'+'<br>• 这件事背后到底有哪些人在推动？各自是什么态度？'+'<br>• 这个合作项目，推进过程中会遇到哪些具体环节的困难？'+'<br>• 我与某人的关系未来会如何演变？症结在哪里？'+'<br>• 这笔复杂的交易或官司，其过程和最终结局细节如何？'+'<br>• 寻找最佳的出行、交涉、谈判的具体方案和时间。',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-9',target:'#qimen_card',title:'奇门遁甲入口',content:'奇门遁甲是“时空战略模型”，如同“战略沙盘”，擅长在具体时间和空间维度上，进行最优选择和运筹布局。'+'<br><strong>核心特点是：融合时空、重在决策、利于谋划。</strong>'+'<br>✓ 结合具体时间和方位，分析能量场优劣。'+'<br>✓ 用于选择最佳时间、最佳方位、最佳策略来采取行动。'+'<br>✓ 在竞争、谈判、寻找机遇等主动谋划方面优势突出。'+'<br><strong>适合提问：</strong>'+'<br>• 我应该选择哪个城市或哪个方位发展更有利？'+'<br>• 谈判/签约，选在哪天哪个时辰、面向哪个方向最有利？'+'<br>• 面对竞争，我应采取何种策略来出奇制胜？'+'<br>• 寻找人或事物，去哪个方向、用什么方法最容易成功？'+'<br>• 想提升财运/事业，如何进行风水或行动上的布局？',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-10',target:'#taiyi_card',title:'太乙神数入口【开发中】',content:'太乙神数被称为“高层战略模型”，如同<strong>企业战略雷达</strong>，擅长洞察<strong>行业周期、组织气运与长期大势</strong>。'+'<br><strong>核心特点是：格局宏大、洞见先机、把握周期。</strong>'+'<br>✓ 侧重分析行业、公司、大型团队的长期发展趋势和转折点。'+'<br>✓ 用于观测市场风向、组织气运、重大项目（如并购、上市）的宏观成败轨迹。'+'<br>✓ 在复杂局势中，预判整体吉凶和未来几年的关键窗口期。'+'<br><strong>适合提问（人事与商业战略层面）：</strong>'+'<br>• 我们行业未来三年的发展周期和机遇点在哪里？'+'<br>• 公司明年的整体气运如何？应注意哪些系统性风险？'+'<br>• 这个大型项目（如IPO、战略转型）的长期成败趋势如何？'+'<br>• 团队或组织未来一年是否会出现大的动荡或变革？'+'<br>• 从长远看，我所在的企业/部门，其发展轨迹和兴衰时机如何？',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-11',target:'#liuyao_card',title:'进入六爻功能',content:'现在让我们点击六爻卡片，去体验六爻占卜功能。\n\n点击"下一步"将自动跳转到六爻页面。',position:'auto',page:CONFIG.HOME_PAGE},{id:'home-12',target:'#liuyao_card',title:'六爻功能介绍',content:'六爻功能，是使用六爻占卜的入口。\n\n点击"下一步"将自动跳转到六爻页面。',position:'auto',action:"click",actionTarget:'#liuyao_card',actionUrl:'/liuyao',page:CONFIG.HOME_PAGE},];const liuyaoSteps=[{id:'liuyao-1',target:'#main-panel',title:'六爻占卜',content:'六爻是中国古代占卜方法之一，通过摇卦得出六个爻，根据五行生克制断吉凶。<br>这里可以进行专业的六爻排盘和解读。',position:'right',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-2',target:'#person-info',title:'基础信息输入',content:'这是基础信息输入部分，需要您输入一些必要的参数才能进行起卦。'+'<br>有必填与选填，选填的内容不影响解读的功能，只稍微影响解读的适配性； '+'<br>建议都填写完整。'+'<br>特别注意占问问题部分，一个清晰且明确的问题是最重要的。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-2-1',target:'#question',title:'占问问题',content:'这是占问问题输入框，'+'<br> <strong>请注意</strong>'+'<br> <strong>请尽可能输入清晰且指向明确的问题</strong>'+'<br> <strong>比如：我什么时候能有另一半？</strong>'+'<br> <strong>我的当前的事业值得一直持续下去吗？</strong>'+'<br> <strong>【无需输入复杂的背景描述！后端的工作流会自动针对清晰的问题进行推理处理】</strong>'+'<br> <strong>本站非api套壳型技术，无需你描述你问题的来源背景等一切不必要的东西。</strong>',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-3',target:'#agent',title:'解读风格选择',content:'这是解读风格选择<br>点击可选择不同的工作流进行解读。<br>每一个风格选项背后，都是一个精心调试过的工作流；'+'<br>现在六爻拥有：'+'<br>· 专业解析'+'<br>· 爱情、事业、健康、寻物专解',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-4',target:'#agent',title:'风格区别',content:'如果您对六爻比较了解，建议选择专业解读，保留了所有专业术语以及各种古籍的引用原文。'+'<br>如果您对六爻不太了解，仅想知道结果，请选择下面的根据问题分类的专解；'+'<br>这将输出适合普通人看的白话解读。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-5',target:'#shensha',title:'神煞区域',content:'这是神煞展示区域。<br>在六爻卦象中，神煞通常是解读卦象细节中的必要元素<br>这里展示了常用的十三神煞。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-6',target:'#gz',title:'干支时间',content:'这是干支时间区域。<br>这也是六爻中的必要元素，在计算旺衰、应期等的时候是必须的。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-7',target:'#paipan',title:'排盘区域',content:'这是排盘区域。<br>我们将在这里排盘，灵爻妙解使用实时动态排盘技术，任何的参数变化，排盘变化都会实时更新。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-8',target:'#bengua',title:'本卦区域',content:'这是本卦区域。<br>在这里您可以看到本卦的卦象。'+'<br>本卦的所有爻都是可以直接点击的；'+'<br>点击爻将会在 少阳-少阴-老阳-老阴循环变化。'+'<br>藏卦与变卦会在需要的时候自动显示。',position:'auto',},{id:'liuyao-9',target:'#2yao',title:'手动实时排盘',content:'我们点击了二爻，现在你可以看到盘面已经实时变化了。',position:'auto',action:'click',actionTarget:'#2yao',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-10',target:'#qigua',title:'时空起卦',content:'时空起卦是基于立极派的一种起卦方法。'+'<br> 如果您手中没有硬币或铜钱，也可以通过点击【6次】本按钮进行起卦；'+'<br> 现在引导程序将自动点击一次。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-11',target:'#qigua',title:'时空起卦',content:'您可以看到，目前盘面已经变化。',position:'auto',action:'click',actionTarget:'#qigua',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-12',target:'#jiegua',title:'解读',content:'当输入完基础信息和排好盘以后，即可点击解读按钮'+'<br>ai将通过你选择的解读风格调用不同的工作流来对卦象进行精准解读',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-13',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-14',target:'#tips',title:'解读状态指示',content:'在点击解读按钮后，这里可以看到解读的状态',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-15',target:'[data-target="course_page"]',title:'新手教程',content:'当然，如果你不喜欢这种主动引导式教程，也可直接点击此处查看本站的新手教程',action:'click',actionTarget:'[data-target="course_page"]',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-16',target:'[data-target="mapping_page"]',title:'类象查询',content:'为了让部分不想使用ai进行解读的专业道友能快速的查看各种类象 '+'<br>本站将知识库中的类象部分也进行了整理'+'<br>通过左侧的导航条，可方便的进行查找类象',position:'auto',action:'click',actionTarget:'[data-target="mapping_page"]',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-17',target:'[data-target="yijing"]',title:'易经查询',content:'本站还提供了完善的易经原文查询。 '+'<br> 同样，可通过左侧导航条点击卦名，查看易经的爻辞、彖辞、象等;'+'<br> 还可以通过直接在导航条上部的搜索框直接输入卦名进行查询;'+'<br> 当然，还有更方便的方法:'+'<br> <strong>直接点击排盘区域本卦的爻，</strong>等待3秒后此部分也会自动跳转到与本卦相符的卦象处',position:'auto',action:'click',actionTarget:'[data-target="yijing"]',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-18',target:'#reset',title:'重置',content:'这是重置按钮，在解读完成一个卦后，点击重置按钮，将会清空所有内容，恢复默认',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-19',target:'#save',title:'保存',content:'在解读完成后，会展现评分框，然后，您就可以点击保存按钮将此卦象进行保存'+'<br> 保存是保存在云端的，您可以在不同的设备进行查看',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-20',target:'#share',title:'分享',content:'在解读完成后，您可以点击此按钮，将本卦进行分享 '+'<br> 分享后会自动复制分享链接到剪贴板，所有人都可以通过此链接进行访问此卦 '+'<br> 同时，卦例也会展现在卦例广场当中',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-21',target:'#share',title:'大六壬排盘',content:'六爻排盘与解读引导已完成。'+'<br>现在，让我们去看看大六壬是如何工作的。',position:'auto',page:CONFIG.LIUYAO_PAGE},{id:'liuyao-22',target:'#menu-area a[href="/liuren"]',title:'六爻排盘',content:'六爻排盘与解读引导已完成。',position:'auto',action:'click',actionTarget:'#menu-area a[href="/liuren"]',actionUrl:'/liuren',page:CONFIG.LIUYAO_PAGE}];const liurenSteps=[{id:'liuren-1',target:'#main-panel',title:'大六壬占卜',content:'大六壬占卜也是传承千年的占卜方式，被称之为三式之首，主要是用于人事。'+'<br>本站的排盘方法为正时排盘+活时排盘；'+'<br>当您进入本页面时，就已经基于当前时间排好盘了。'+'<br>如需活时排盘，只需要点击一次活时起卦即可。'+'<br>您可以看到，整个页面的布局与六爻一致，所以操作逻辑也是一致的。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-2',target:'#person-info',title:'基础信息输入',content:'这是基础信息输入部分，需要您输入一些必要的参数才能进行起卦。'+'<br>有必填与选填，选填的内容不影响解读的功能，只稍微影响解读的适配性； '+'<br>建议都填写完整。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-3',target:'#question',title:'占问问题',content:'这是占问问题输入框，'+'<br> <strong>请注意</strong>'+'<br> <strong>请尽可能输入清晰且指向明确的问题</strong>'+'<br> <strong>比如：我什么时候能有另一半？</strong>'+'<br> <strong>我的当前的事业值得一直持续下去吗？</strong>'+'<br> <strong>【无需输入复杂的背景描述！后端的工作流会自动针对清晰的问题进行推理处理】</strong>'+'<br> <strong>本站非api套壳型技术，无需你描述你问题的来源背景等一切不必要的东西。</strong>',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-4',target:'#time',title:'时间选择',content:'如果您需解读一个在其余时间起好的卦象，'+'<br>可直接点击，进行选择起卦时间。'+'<br>此处时间的输入为【国历】',position:'auto',action:'click',actionTarget:'#time',page:CONFIG.LIUREN_PAGE},{id:'liuren-5',target:'#time',title:'时间选择',content:'点击确认，'+'<br>程序将基于选择的时间自动更新排盘。',position:'auto',action:'click',actionTarget:'.p-select-submit-btn',page:CONFIG.LIUREN_PAGE},{id:'liuren-6',target:'#agent',title:'解读风格选择',content:'这是解读风格选择<br>点击可选择不同的工作流进行解读。<br>每一个风格选项背后，都是一个精心调试过的工作流；'+'<br>可选普通流式与集群解读模式。'+'<br>普通流式为单智能体模式，速度快，但可能会偶现幻觉'+'<br>集群模式为24个智能体分不同主题辩论，准确度高，速度慢。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-7',target:'#agent',title:'风格区别',content:'同样，大六壬的专业解读，保留了所有专业术语以及各种古籍的引用原文。'+'<br>如果您对大六壬不太了解，可能会有部分内容看不懂，但是不影响；'+'<br>您只需关注你能看懂的部分也足够。'+'<br>其余的专业术语部分是针对于专业人士，可根据解读自行拓展更多内容用的。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-8',target:'#ganzhi-card',title:'干支时间',content:'这是当前排盘的干支时间显示卡片。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-9',target:'#sanchuan-card',title:'三传四课',content:'这是当前排盘的三传四课，我们解读占比权重很大的一部分。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-10',target:'#tiandipan-card',title:'大六壬盘面',content:'这是详细的排盘，星宿、天将、天地神盘都可以在这里详细的看到。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-11',target:'#jiegua',title:'解读',content:'当输入完基础信息和排好盘以后，即可点击解读按钮，'+'<br>ai将通过你选择的解读风格调用不同的工作流来对卦象进行精准解读。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-12',target:'#main-panel',title:'总结',content:'这便是本站极致精简后的大六壬占卜流程：'+'<br>如果您在注册时已经填写了选填的参数，'+'<br>那么理论上，您只需要填写问题，点击解读即可。'+'<br>后端程序会自动根据您提供的信息与大六壬盘面进行精准解读',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-13',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示'+'<br> 您可以看到，这部分与六爻几乎相同，功能也基本一致，'+'<br> 拥有类象查询、重置盘面、保存、分享等功能。'+'<br> 这里就不过多赘述了。'+'<br> 接下来我们一起去看看奇门遁甲。',position:'auto',page:CONFIG.LIUREN_PAGE},{id:'liuren-14',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示'+'<br> 您可以看到，这部分与六爻几乎相同，功能也基本一致，'+'<br> 拥有类象查询、重置盘面、保存、分享等功能。'+'<br> 这里就不过多赘述了。'+'<br> 接下来我们一起去看看奇门遁甲。',position:'auto',action:'click',actionTarget:'#menu-area a[href="/qimen"]',actionUrl:'/qimen',page:CONFIG.LIUREN_PAGE},];const qimenSteps=[{id:'qimen-1',target:'#main-panel',title:'奇门遁甲',content:'奇门遁甲也属于预测中的三式之一，曾经主要运用在军事与风水中。'+'<br>本站的排盘方法为 时家转盘奇门。'+'<br>在人事预测中，更加擅长于从大环境来推算一件事情的走向。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-2',target:'#person-info',title:'基础信息输入',content:'这是基础信息输入部分，需要您输入一些必要的参数才能进行起卦。'+'<br>有必填与选填，选填的内容不影响解读的功能，只稍微影响解读的适配性； '+'<br>建议都填写完整。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-3',target:'#question',title:'基础信息输入',content:'这是占问问题输入框，'+'<br> <strong>请注意</strong>'+'<br> <strong>请尽可能输入清晰且指向明确的问题</strong>'+'<br> <strong>比如：我什么时候能有另一半？</strong>'+'<br> <strong>我的当前的事业值得一直持续下去吗？</strong>'+'<br> <strong>【无需输入复杂的背景描述！后端的工作流会自动针对清晰的问题进行推理处理】</strong>'+'<br> <strong>本站非api套壳型技术，无需你描述你问题的来源背景等一切不必要的东西。</strong>',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-4',target:'#time',title:'时间选择',content:'如果您需解读一个在其余时间起好的卦象，'+'<br>可直接点击，进行选择起卦时间。'+'<br>此处时间的输入为【国历】',position:'auto',action:'click',actionTarget:'#time',page:CONFIG.QIMEN_PAGE},{id:'qimen-5',target:'#time',title:'时间选择',content:'点击确认，'+'<br>程序将基于选择的时间自动更新排盘。',position:'auto',action:'click',actionTarget:'.p-select-submit-btn',page:CONFIG.QIMEN_PAGE},{id:'qimen-6',target:'#agent',title:'解读风格选择',content:'这是解读风格选择<br>点击可选择不同的工作流进行解读。<br>每一个风格选项背后，都是一个精心调试过的工作流；'+'<br>可选普通流式与集群解读模式。'+'<br>普通流式为单智能体模式，速度快，但可能会偶现幻觉'+'<br>集群模式为多个智能体分不同主题辩论，准确度高，速度慢。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-7',target:'#agent',title:'风格区别',content:'同样，奇门遁甲的专业解读，保留了所有专业术语以及各种古籍的引用原文。'+'<br>如果您对奇门遁甲不太了解，可能会有部分内容看不懂，但是不影响；'+'<br>您只需关注你能看懂的部分也足够。'+'<br>其余的专业术语部分是针对于专业人士，可根据解读自行拓展更多内容用的。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-8',target:'#ganzhi-card',title:'干支时间',content:'这是当前排盘的干支时间显示卡片。',position:'top',page:CONFIG.QIMEN_PAGE},{id:'qimen-9',target:'#ju-card',title:'盘局信息',content:'这里展示的是当前奇门排盘的盘局信息。',position:'top',page:CONFIG.QIMEN_PAGE},{id:'qimen-10',target:'#paipan',title:'详细排盘',content:'这里展示的是当前奇门排盘的详细信息。'+'<br>使用了新手友好的信息展示方法。'+'<br>大部分市面上未展示的隐藏信息，均完整显示。',position:'top',page:CONFIG.QIMEN_PAGE},{id:'qimen-11',target:'#jiegua',title:'解读',content:'这是解读按钮，'+'<br>当输入完基础信息和排好盘以后，即可点击解读按钮进行解读，'+'<br>ai将通过你选择的解读风格调用不同的工作流来对卦象进行精准解读。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-12',target:'#main-panel',title:'总结',content:'这便是本站极致精简后的奇门遁甲占卜流程：'+'<br>如果您在注册时已经填写了选填的参数，'+'<br>那么理论上，您只需要填写问题，点击解读即可。'+'<br>后端程序会自动根据您提供的信息与奇门遁甲的盘面进行精准解读。',position:'auto',page:CONFIG.QIMEN_PAGE},{id:'qimen-13',target:'#chat-panel',title:'解读区域',content:'这里是解读内容展示和部分相关功能展示'+'<br> 您可以看到，这部分与六爻、大六壬几乎相同，功能也基本一致，'+'<br> 拥有新手引导、类象查询、重置盘面、保存、分享等功能。'+'<br> 这里就不过多赘述了。',position:'auto',page:CONFIG.QIMEN_PAGE},];const squareSteps=[{id:'square-intro',target:'#main-panel',title:'卦例广场',content:'卦例广场是 ancient-chinese-astrology 模块提供的一个功能，用于生成随机的卦象和卦解。\n\n这里可以进行专业的卦例广场排盘和解读。',position:'top',page:CONFIG.SQUARE_PAGE},{id:'square-5yao',}]
function init(){document.addEventListener('guideButtonClick',handleGuideButtonClick);const currentPage=normalizePath(window.location.pathname);const savedStepId=localStorage.getItem('guide_current_step');const savedPage=normalizePath(localStorage.getItem('guide_current_page'));if(savedStepId&&savedPage){const allSteps=homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps);guideModule.registerSteps(allSteps);if(savedPage===currentPage){setTimeout(function(){guideModule.startFrom(savedStepId);},300);}else if(savedPage===normalizePath(CONFIG.HOME_PAGE)&&currentPage===normalizePath(CONFIG.LIUYAO_PAGE)){const firstLiuyaoStep=findNextStepAfter(homeSteps);if(firstLiuyaoStep){setTimeout(function(){guideModule.startFrom(firstLiuyaoStep.id);},300);}else{setTimeout(function(){guideModule.startFrom(savedStepId);},300);}}else if(savedPage===normalizePath(CONFIG.LIUYAO_PAGE)&&currentPage===normalizePath(CONFIG.HOME_PAGE)){setTimeout(function(){guideModule.startFrom(savedStepId);},300);}else{const currentPageStep=allSteps.find(function(s){return normalizePath(s.page)===currentPage;});if(currentPageStep){setTimeout(function(){guideModule.startFrom(savedStepId);},300);}else{console.log('GuideExample: 等待页面跳转，savedPage='+savedPage+', currentPage='+currentPage);}}
return;}
if(currentPage===normalizePath(CONFIG.HOME_PAGE)){guideModule.registerSteps(homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps));}else if(currentPage===normalizePath(CONFIG.LIUYAO_PAGE)){guideModule.registerSteps(liuyaoSteps);}else if(currentPage===normalizePath(CONFIG.LIUREN_PAGE)){guideModule.registerSteps(liurenSteps);}else if(currentPage===normalizePath(CONFIG.QIMEN_PAGE)){guideModule.registerSteps(qimenSteps);}
else{waitForGuideEnd();}}
function handleGuideButtonClick(){guideModule.reset();const currentPage=normalizePath(window.location.pathname);if(currentPage===normalizePath(CONFIG.HOME_PAGE)){guideModule.registerSteps(homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps));guideModule.start();}else if(currentPage===normalizePath(CONFIG.LIUYAO_PAGE)){guideModule.registerSteps(liuyaoSteps);guideModule.start();}else if(currentPage===normalizePath(CONFIG.LIUREN_PAGE)){guideModule.registerSteps(liurenSteps);guideModule.start();}else if(currentPage===normalizePath(CONFIG.QIMEN_PAGE)){guideModule.registerSteps(qimenSteps);guideModule.start();}else if(currentPage===normalizePath(CONFIG.SQUARE_PAGE)){guideModule.registerSteps(squareSteps);guideModule.start();}
else{console.log('GuideExample: 当前页面暂无引导内容');messageModule.show({title:'暂无引导',content:'当前页面暂无引导内容，建议您先了解首页功能。',showCancel:false,confirmText:'我知道了',onConfirm:function(){messageModule.hide();}});}}
function findNextStepAfter(stepList){const allSteps=homeSteps.concat(liuyaoSteps).concat(liurenSteps).concat(qimenSteps);const lastStepId=stepList[stepList.length-1].id;const lastIndex=allSteps.findIndex(function(s){return s.id===lastStepId;});if(lastIndex>=0&&lastIndex<allSteps.length-1){return allSteps[lastIndex+1];}
return null;}
function waitForGuideEnd(){const checkInterval=setInterval(function(){const savedStep=localStorage.getItem('guide_current_step');if(!savedStep){clearInterval(checkInterval);}},1000);setTimeout(function(){clearInterval(checkInterval);},5000);}})();;(()=>{'use strict';const SERVICE_WORKER_PATH='/serviceworker.js';const SW_REFRESHED_KEY='sw_has_refreshed';let hasRefreshed=false;function activateWaitingServiceWorker(worker){if(!worker){return;}
worker.postMessage({type:'SKIP_WAITING'});}
function shouldSkipReload(){try{if(sessionStorage.getItem(SW_REFRESHED_KEY)==='1'){return true;}
sessionStorage.setItem(SW_REFRESHED_KEY,'1');return false;}catch(error){if(hasRefreshed){return true;}
hasRefreshed=true;return false;}}
function bindControllerChangeReload(){navigator.serviceWorker.addEventListener('controllerchange',function(){if(shouldSkipReload()){return;}
window.location.reload();});}
function bindRegistrationUpdate(registration){if(registration.waiting){activateWaitingServiceWorker(registration.waiting);}
registration.addEventListener('updatefound',function(){const newWorker=registration.installing;if(!newWorker){return;}
newWorker.addEventListener('statechange',function(){if(newWorker.state==='installed'&&navigator.serviceWorker.controller){activateWaitingServiceWorker(newWorker);}});});}
async function registerServiceWorker(){try{const registration=await navigator.serviceWorker.register(SERVICE_WORKER_PATH);bindRegistrationUpdate(registration);}catch(error){console.log('注册 Service Worker 失败');}}
function init(){if(!('serviceWorker'in navigator)){return;}
bindControllerChangeReload();window.addEventListener('load',registerServiceWorker);}
init();})();;const inputModule=(()=>{document.addEventListener('DOMContentLoaded',async function(){await init();});async function init(){initTime();if(await isLogin()){await initDatePicker('#time');await initDatePicker('#birthday');try{await initLoginInfoInput();}catch(e){console.warn('initLoginInfoInput failed:',e);}}else{await initDatePicker('#time');await initDatePicker('#birthday');}
document.dispatchEvent(new CustomEvent('infoInputModuleReady'));}
function initTime(){const now=new Date();const year=now.getFullYear();const month=String(now.getMonth()+1).padStart(2,'0');const day=String(now.getDate()).padStart(2,'0');const hours=String(now.getHours()).padStart(2,'0');const minutes=String(now.getMinutes()).padStart(2,'0');const seconds=String(now.getSeconds()).padStart(2,'0');document.getElementById('time').value=`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;}
function initDatePicker(elemId){return popoPicker.dateTime(elemId,{display:'auto',position:'bottom-left',date:true,time:true,format:'YYYY-MM-DD HH:mm:ss',save:(result,target)=>{target.setAttribute('value',result);target.value=result;target.dispatchEvent(new Event('change',{bubbles:true}));}})}
async function initLoginInfoInput(){const data=await getUserInfo();if(data.success){const name=document.getElementById('name');const gender=document.getElementById('gender');const birthday=document.getElementById('birthday');const identity=document.getElementById('identity');const time=document.getElementById('time');if(!name.value.trim()){name.value=data.username||'';}
if(!gender.value){gender.value=data.gender||'男';}
if(data.birthday){birthday.value=data.birthday;}else{birthday.value='';}
if(!identity.value.trim()){identity.value=String(data.identity||'').trim()||'未知';}
time.value=getNowTime();}else{messageModule.error('获取用户信息失败',data.message);}}
function getNowTime(){const now=new Date();const year=now.getFullYear();const month=String(now.getMonth()+1).padStart(2,'0');const day=String(now.getDate()).padStart(2,'0');const hours=String(now.getHours()).padStart(2,'0');const minutes=String(now.getMinutes()).padStart(2,'0');const seconds=String(now.getSeconds()).padStart(2,'0');return`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;}
async function getUserInfo(){const response=await fetch('/account/api/user_info/',{method:'GET',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')}});return await response.json();}
return{init,}})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',initAppraisePanel);function initAppraisePanel(){initAppraiseSwitchState();initAppraiseRating();initAppraiseListener();}
function initAppraiseSwitchState(){const isOpenBtn=document.getElementById('case-is-open');if(!isOpenBtn){return;}
const isOpen=isOpenBtn.getAttribute('data-open')==='True';const switchKnob=document.getElementById('appraise-switch-knob');const switchLabel=document.getElementById('appraise-switch-label');if(isOpen){isOpenBtn.classList.add('active');switchKnob.classList.add('active');switchLabel.classList.add('active');switchLabel.innerText='公开';}else{isOpenBtn.classList.remove('active');switchKnob.classList.remove('active');switchLabel.classList.remove('active');switchLabel.innerText='私密';}}
function initAppraiseRating(){const ratingInput=document.getElementById('appraise-rating-input');const ratingValueDisplay=document.getElementById('rating-value-display');if(!ratingInput){return;}
ratingInput.value=8.0;ratingInput.setAttribute('value','8.0');if(ratingValueDisplay){ratingValueDisplay.textContent='8.0';}}
function initAppraiseListener(){const ratingSlider=document.getElementById('appraise-rating-input');const ratingValueDisplay=document.getElementById('rating-value-display');const isOpenBtn=document.getElementById('case-is-open');if(!ratingSlider||!ratingValueDisplay||!isOpenBtn){return;}
isOpenBtn.addEventListener('click',toggleIsOpen);ratingSlider.addEventListener('input',function(){ratingValueDisplay.textContent=this.value;ratingSlider.setAttribute('value',this.value);});}
function toggleIsOpen(){const isOpenBtn=document.getElementById('case-is-open');const switchKnob=document.getElementById('appraise-switch-knob');const switchLabel=document.getElementById('appraise-switch-label');const isActive=isOpenBtn.classList.contains('active');isOpenBtn.classList.toggle('active');switchKnob.classList.toggle('active');switchLabel.classList.toggle('active');if(!isActive){isOpenBtn.setAttribute('data-open','True');switchLabel.innerText='公开';}else{isOpenBtn.setAttribute('data-open','False');switchLabel.innerText='私密';}}
function resetAppraisePanel(){const isOpenBtn=document.getElementById('case-is-open');if(isOpenBtn){isOpenBtn.setAttribute('data-open','True');}
initAppraiseSwitchState();initAppraiseRating();}
window.appraiseModule={resetAppraisePanel:resetAppraisePanel};})();;(()=>{document.addEventListener('DOMContentLoaded',initCollapsiblePanels);function initCollapsiblePanels(){const collapsibleHeaders=document.querySelectorAll('.collapsible-header');collapsibleHeaders.forEach(header=>{header.addEventListener('click',function(){this.classList.toggle('active');const content=this.nextElementSibling;content.classList.toggle('active');});});const tips=document.getElementById('tips');const agentCloseBtn=document.getElementById('agent-close-btn');if(tips){tips.addEventListener('click',showAgentPanel);}
if(agentCloseBtn){agentCloseBtn.addEventListener('click',hideAgentPanel);}}
function showAgentPanel(){const agentPanel=document.getElementById('agent-panel');if(agentPanel){agentPanel.classList.add('active')}}
function hideAgentPanel(){const agentPanel=document.getElementById('agent-panel');if(agentPanel){agentPanel.classList.remove('active');}}})();;(()=>{document.addEventListener('DOMContentLoaded',initSwitchTabs);function initSwitchTabs(){const tabs=document.querySelectorAll('.chat-panel-tabs .tab');let currentActiveIndex=0;tabs.forEach((tab,index)=>{if(tab.classList.contains('active')){currentActiveIndex=index;}});tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>handleTabClick(tab,index,tabs));});}
function handleTabClick(clickedTab,tabIndex,allTabs){const target=clickedTab.getAttribute('data-target');if(clickedTab.classList.contains('active')){return;}
const currentActiveIndex=getCurrentActiveIndex(allTabs);const direction=tabIndex>currentActiveIndex?'right':'left';updateTabStates(clickedTab,allTabs);switchContent(target,direction);}
function getCurrentActiveIndex(tabs){for(let i=0;i<tabs.length;i++){if(tabs[i].classList.contains('active')){return i;}}
return 0;}
function updateTabStates(activeTab,tabs){tabs.forEach(tab=>tab.classList.remove('active'));activeTab.classList.add('active');}
function switchContent(target,direction){const activeContent=document.querySelector('.content.active');const targetContent=document.getElementById(target);if(!targetContent||activeContent===targetContent){return;}
const allContents=document.querySelectorAll('.content');allContents.forEach(content=>{content.classList.remove('slideOutLeft','slideOutRight','slideInLeft','slideInRight','prepare-slide-left','prepare-slide-right');});if(direction==='right'){targetContent.classList.add('prepare-slide-right');}else{targetContent.classList.add('prepare-slide-left');}
if(targetContent.tagName==='IFRAME'){if(!targetContent.src){const src=targetContent.getAttribute('data-src')||targetContent.getAttribute('src');if(src){targetContent.src=src;}}
setTimeout(()=>{targetContent.style.width='100%';targetContent.style.height='100%';targetContent.style.border='none';targetContent.style.overflowY='auto';},100);}
requestAnimationFrame(()=>{if(activeContent){if(direction==='right'){activeContent.classList.add('slideOutLeft');}else{activeContent.classList.add('slideOutRight');}
if(direction==='right'){targetContent.classList.add('slideInRight');}else{targetContent.classList.add('slideInLeft');}
activeContent.addEventListener('animationend',function handler(){activeContent.removeEventListener('animationend',handler);activeContent.classList.remove('active','slideOutLeft','slideOutRight');});}
targetContent.addEventListener('animationend',function handler(){targetContent.removeEventListener('animationend',handler);targetContent.classList.remove('slideInLeft','slideInRight','prepare-slide-left','prepare-slide-right');targetContent.classList.add('active');if(targetContent.tagName==='IFRAME'){targetContent.offsetHeight;}});});}})();;let streamRenderer=(()=>{'use strict';const MCP_HTML_PATTERN=/<div\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/div>|<span\s+class="mcp-(?:result|error)[^"]*">[\s\S]*?<\/span>/g;function renderMarkdownSafe(content){if(typeof liuyaoUtils!=='undefined'&&typeof liuyaoUtils.renderMarkdownSafe==='function'){return liuyaoUtils.renderMarkdownSafe(content);}
const mcpFragments=[];const textWithPlaceholders=(content||'').replace(MCP_HTML_PATTERN,function(match){const index=mcpFragments.length;mcpFragments.push(match);return'\n%%MCP_'+index+'%%\n';});const tempDiv=document.createElement('div');tempDiv.textContent=textWithPlaceholders;const escaped=tempDiv.innerHTML;let html;if(typeof marked!=='undefined'&&marked.parse){html=marked.parse(escaped);}else{html=escaped.replace(/\n/g,'<br>');}
for(let i=0;i<mcpFragments.length;i++){html=html.replace('<p>%%MCP_'+i+'%%</p>',mcpFragments[i]);html=html.replace('%%MCP_'+i+'%%',mcpFragments[i]);}
return html;}
const CONFIG={TYPEWRITER_SPEED:10,CHARS_PER_TICK:5,SCROLL_THRESHOLD:100,USER_SCROLL_TIMEOUT:3000};const twContent={};const twPrintedUntil={};const twTimers={};const scrollStates={};const scopeElements={};const scopeAttempts={};function render(eleId,newChunk){if(!eleId||typeof newChunk!=='string'){console.warn('render: 参数无效',{eleId,newChunk});return;}
initScrollListener(eleId);if(!twContent[eleId]){twContent[eleId]='';twPrintedUntil[eleId]=0;}
twContent[eleId]+=newChunk;renderNextTick(eleId);startTypeWriter(eleId);}
function shouldIgnoreAttempt(scopeId,attemptId){if(!attemptId){return false;}
const currentAttempt=Number(scopeAttempts[scopeId]||0);return currentAttempt>0&&Number(attemptId)<currentAttempt;}
function renderElement(scopeId,element,newChunk,options){if(!scopeId||!element||typeof newChunk!=='string'){console.warn('renderElement: 参数无效',{scopeId,element,newChunk});return;}
const renderOptions=options||{};const attemptId=Number(renderOptions.attemptId||0);if(shouldIgnoreAttempt(scopeId,attemptId)){return;}
if(attemptId){scopeAttempts[scopeId]=attemptId;}
scopeElements[scopeId]=element;if(!twContent[scopeId]){twContent[scopeId]='';twPrintedUntil[scopeId]=0;}
twContent[scopeId]+=newChunk;renderNextTick(scopeId,renderOptions);startTypeWriter(scopeId,renderOptions);}
function resetScope(scopeId,attemptId){if(!scopeId){return;}
const nextAttempt=Number(attemptId||0);if(shouldIgnoreAttempt(scopeId,nextAttempt)){return;}
if(nextAttempt){scopeAttempts[scopeId]=nextAttempt;}
_resetScrollState(scopeId);_clearTypeWriter(scopeId);twContent[scopeId]='';twPrintedUntil[scopeId]=0;const element=scopeElements[scopeId];if(element){element.innerHTML='';}}
function flush(eleId){if(!eleId)return;stopTypeWriter(eleId);const ele=document.getElementById(eleId);const fullContent=twContent[eleId]||'';if(ele&&fullContent){twPrintedUntil[eleId]=fullContent.length;ele.innerHTML=renderMarkdownSafe(fullContent);ele.scrollTo({top:ele.scrollHeight,behavior:'smooth'});}}
function setContent(eleId,content){if(!eleId||typeof content!=='string'){console.warn('setContent: 参数无效',{eleId,content});return;}
twContent[eleId]=content;twPrintedUntil[eleId]=content.length;const ele=document.getElementById(eleId);if(ele){ele.innerHTML=renderMarkdownSafe(content);}}
function reset(eleId){if(eleId){_resetScrollState(eleId);_clearTypeWriter(eleId);twContent[eleId]='';twPrintedUntil[eleId]=0;}else{Object.keys(scrollStates).forEach(_resetScrollState);Object.keys(twTimers).forEach(_clearTypeWriter);for(let key in twContent)delete twContent[key];for(let key in twPrintedUntil)delete twPrintedUntil[key];for(let key in scopeElements)delete scopeElements[key];for(let key in scopeAttempts)delete scopeAttempts[key];}}
function clear(eleId){if(!eleId)return;reset(eleId);const ele=document.getElementById(eleId);if(ele){ele.innerHTML='';}}
function startTypeWriter(eleId,options){if(twTimers[eleId])return;const renderOptions=options||{};const ele=scopeElements[eleId]||document.getElementById(eleId);if(!ele)return;twTimers[eleId]=setInterval(()=>{const fullContent=twContent[eleId]||'';const printedUntil=twPrintedUntil[eleId]||0;if(printedUntil>=fullContent.length){stopTypeWriter(eleId);return;}
twPrintedUntil[eleId]=printedUntil+CONFIG.CHARS_PER_TICK;const displayContent=fullContent.slice(0,twPrintedUntil[eleId]);ele.innerHTML=renderMarkdownSafe(displayContent);_smartScroll(ele,eleId);if(typeof renderOptions.onAfterRender==='function'){renderOptions.onAfterRender(ele);}},CONFIG.TYPEWRITER_SPEED);}
function renderNextTick(eleId,options){const renderOptions=options||{};const ele=scopeElements[eleId]||document.getElementById(eleId);if(!ele)return;const fullContent=twContent[eleId]||'';const printedUntil=twPrintedUntil[eleId]||0;if(printedUntil>=fullContent.length){return;}
twPrintedUntil[eleId]=Math.min(printedUntil+CONFIG.CHARS_PER_TICK,fullContent.length);const displayContent=fullContent.slice(0,twPrintedUntil[eleId]);ele.innerHTML=renderMarkdownSafe(displayContent);_smartScroll(ele,eleId);if(typeof renderOptions.onAfterRender==='function'){renderOptions.onAfterRender(ele);}}
function stopTypeWriter(eleId){if(twTimers[eleId]){clearInterval(twTimers[eleId]);twTimers[eleId]=null;}}
function initScrollListener(eleId){if(scrollStates[eleId])return;scrollStates[eleId]={isUserScrolling:false,timer:null};const ele=document.getElementById(eleId);if(!ele)return;ele.addEventListener('scroll',()=>{const state=scrollStates[eleId];state.isUserScrolling=true;if(state.timer){clearTimeout(state.timer);}
state.timer=setTimeout(()=>{state.isUserScrolling=false;},CONFIG.USER_SCROLL_TIMEOUT);});}
function _smartScroll(ele,eleId){const state=scrollStates[eleId];if(!state||!state.isUserScrolling){if(ele.scrollHeight-ele.scrollTop-ele.clientHeight<CONFIG.SCROLL_THRESHOLD){ele.scrollTo({top:ele.scrollHeight,behavior:'smooth'});}}}
function _resetScrollState(eleId){if(scrollStates[eleId]){if(scrollStates[eleId].timer){clearTimeout(scrollStates[eleId].timer);}
scrollStates[eleId]={isUserScrolling:false,timer:null};}}
function _clearTypeWriter(eleId){if(twTimers[eleId]){clearInterval(twTimers[eleId]);twTimers[eleId]=null;}}
return{render,renderElement,resetScope,flush,setContent,reset,clear,};})();;const taiyiUtils=(()=>{'use strict';function getCookie(name){const value=`; ${document.cookie}`;const parts=value.split(`; ${name}=`);if(parts.length===2){return parts.pop().split(';').shift();}
return'';}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,(char)=>{const escapeMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};return escapeMap[char]||char;});}
function renderMarkdownSafe(markdownText){const escapedText=escapeHtml(markdownText||'');if(typeof marked!=='undefined'&&marked.parse){try{return marked.parse(escapedText,{breaks:true,gfm:true});}catch(error){console.warn('太乙 Markdown 渲染失败，回退纯文本:',error);}}
return escapedText.replace(/\n/g,'<br>');}
async function requestJson(url,options={}){const response=await fetch(url,options);let data=null;try{data=await response.json();}catch(error){if(!response.ok){throw new Error(`请求失败：${response.status}`);}
throw new Error('服务返回了无法解析的数据');}
if(!response.ok||data?.success===false){throw new Error(data?.message||`请求失败：${response.status}`);}
return data;}
function normalizeIsoOrTimestamp(value){if(!value){return 0;}
if(typeof value==='number'){return Number.isFinite(value)?value:0;}
const time=Date.parse(value);return Number.isNaN(time)?0:time;}
function toBoolean(value){if(typeof value==='boolean'){return value;}
return String(value).toLowerCase()==='true';}
function parseBaseGuaxiang(baseGuaxiang){if(!baseGuaxiang){return{};}
if(typeof baseGuaxiang==='object'){return baseGuaxiang;}
try{const parsed=JSON.parse(baseGuaxiang);return parsed&&typeof parsed==='object'?parsed:{};}catch(error){try{const normalized=String(baseGuaxiang).replace(/'/g,'"').replace(/None/g,'null').replace(/True/g,'true').replace(/False/g,'false');const parsed=JSON.parse(normalized);return parsed&&typeof parsed==='object'?parsed:{};}catch(fallbackError){return{};}}}
return{getCookie,escapeHtml,renderMarkdownSafe,requestJson,normalizeIsoOrTimestamp,toBoolean,parseBaseGuaxiang,};})();;const taiyiUI=(()=>{'use strict';function setButtonState(buttonId,options={}){const button=document.getElementById(buttonId);if(!button){return;}
if(typeof options.disabled==='boolean'){button.disabled=options.disabled;button.classList.toggle('disabled',options.disabled);}
if(options.text){button.innerHTML=options.text;}}
function setBtnState(state){if(state==='loading'){setButtonState('jiegua',{disabled:false,text:'取消'});setButtonState('reset',{disabled:true});setButtonState('save',{disabled:true,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});return;}
if(state==='cancelling'){setButtonState('jiegua',{disabled:true,text:'取消中...'});setButtonState('reset',{disabled:true});setButtonState('save',{disabled:true,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});return;}
if(state==='success'){setButtonState('jiegua',{disabled:true,text:'已解读'});setButtonState('reset',{disabled:false});setButtonState('save',{disabled:false,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});return;}
setButtonState('jiegua',{disabled:false,text:'解读'});setButtonState('reset',{disabled:false});setButtonState('save',{disabled:true,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});}
function updateTips(text,isActive=true){const tips=document.getElementById('tips');const tipsText=document.getElementById('tips-text');if(tipsText){tipsText.textContent=text;}
if(tips){tips.classList.toggle('active',isActive);}}
function bindAgentPanelEvents(){const tabs=document.querySelectorAll('.debate-tab');tabs.forEach((tab)=>{tab.onclick=function(){const targetId=tab.getAttribute('data-tab');document.querySelectorAll('.debate-tab').forEach((item)=>{item.classList.toggle('active',item===tab);});document.querySelectorAll('.debate-tab-content').forEach((content)=>{content.classList.toggle('active',content.id===targetId);});};});const tips=document.getElementById('tips');const panel=document.getElementById('agent-panel');if(tips&&panel){tips.onclick=function(){panel.classList.add('active');};}
const closeBtn=document.getElementById('agent-close-btn');if(closeBtn&&panel){closeBtn.onclick=function(){panel.classList.remove('active');};}}
function resetResultActions(){setButtonState('save',{disabled:true,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});}
function enableSaveAction(){setButtonState('save',{disabled:false,text:'保存'});setButtonState('share',{disabled:true,text:'分享'});setButtonState('follow',{disabled:true,text:'追问'});}
function enableFollowAction(){setButtonState('follow',{disabled:false,text:'追问'});}
function enableShareAction(text='分享'){setButtonState('share',{disabled:false,text});}
function markSaveCompleted(){setButtonState('save',{disabled:true,text:'已保存'});}
function setSaveLoading(){setButtonState('save',{disabled:true,text:'保存中...'});}
function setShareLoading(){setButtonState('share',{disabled:true,text:'生成中...'});}
function showSharePanel(url=''){const shareLinkElement=document.getElementById('share-case-url');if(!shareLinkElement){return;}
shareLinkElement.classList.add('active');shareLinkElement.innerText=url;}
function hideSharePanel(){const shareLinkElement=document.getElementById('share-case-url');if(!shareLinkElement){return;}
shareLinkElement.classList.remove('active');shareLinkElement.innerText='';}
function showAppraisePanel(){const panel=document.getElementById('appraise-panel');if(panel){panel.classList.add('active');}}
return{setBtnState,updateTips,bindAgentPanelEvents,resetResultActions,enableSaveAction,enableFollowAction,enableShareAction,markSaveCompleted,setSaveLoading,setShareLoading,showSharePanel,hideSharePanel,showAppraisePanel,};})();;const taiyiLocalStorage=(()=>{'use strict';const storageName='taiyi_jiegua_data';const STATUS={NONE:'none',PENDING:'pending',WAITING_RESOURCE:'waiting_resource',PROCESSING:'processing',COMPLETED:'completed',FAILED:'failed',CANCELLED:'cancelled'};const DEFAULT_DATA={status:STATUS.NONE,mode:'single',agent:'pro',category:'taiyi',lifetime:'false',name:'',gender:'男',birthday:'',identity:'',question:'',time:'',baseGuaxiang:'',markdownGuaxiang:'',resultAnalysis:'',reasoningProcess:'',taskId:'',tempCaseId:'',caseId:'',created_at:'',taskStartedAt:0,shareUrl:'',lastStreamSeq:0};function normalizeDataShape(data){const nextData={...DEFAULT_DATA,...(data||{})};if(!nextData.taskId&&nextData.task_id){nextData.taskId=nextData.task_id;}
delete nextData.task_id;return nextData;}
function getData(){try{const data=localStorage.getItem(storageName);return data?normalizeDataShape(JSON.parse(data)):null;}catch(error){return null;}}
function replaceStorage(data){localStorage.setItem(storageName,JSON.stringify(normalizeDataShape(data)));}
function updateStorageData(field,value){const data=getData()||{...DEFAULT_DATA};data[field]=(data[field]||'')+value;replaceStorage(data);}
function setStorageData(field,value){const data=getData()||{...DEFAULT_DATA};data[field==='task_id'?'taskId':field]=value;replaceStorage(data);}
function batchUpdateStorageData(dataObj){const data={...(getData()||DEFAULT_DATA)};Object.entries(dataObj||{}).forEach(([field,value])=>{data[field==='task_id'?'taskId':field]=value;});replaceStorage(data);}
function getKeyData(key){const data=getData();return data&&data[key]!==undefined?data[key]:null;}
function clearStorage(){localStorage.removeItem(storageName);}
function resetStorage(){replaceStorage({...DEFAULT_DATA});}
function resetTaskRuntimeData(){batchUpdateStorageData({status:STATUS.NONE,resultAnalysis:'',reasoningProcess:'',taskId:'',tempCaseId:'',caseId:'',created_at:'',taskStartedAt:0,shareUrl:'',lastStreamSeq:0});}
function initStorage(){const data=getData();if(!data){resetStorage();return;}
replaceStorage(data);}
return{STATUS,DEFAULT_DATA,getData,getKeyData,replaceStorage,updateStorageData,setStorageData,batchUpdateStorageData,clearStorage,resetStorage,resetTaskRuntimeData,initStorage,};})();;(()=>{document.getElementById('help').addEventListener('click',showHelp);function showHelp(){messageModule.show({title:'如何填写信息',content:`
            <p><strong>姓名：</strong>真名假名均可。</p>
            <p><strong>性别：</strong>必须是占问人的真实性别。</p>
            <p><strong>出生日期：</strong>精确到日即可，需填写公历。</p>
            <p><strong>身份：</strong>即你的职业，可以是学生、生意人、打工人等，选填。</p>
            <p><strong>占问事项：</strong>简略的填写需要问的问题，无需描述过多的背景信息。</p>
            <p><strong>占问时间：</strong>即起卦的时间。</p>
            <p><strong>解读类型：</strong>必填，由于太乙是属于大势预测，在运用到个人身上时预设了一个个人终身的模板，除此以外，均选择大势预测即可。</p>
            <p><strong>工作流模式：</strong></p>
                <p><strong>标准流式：</strong>即使用基本工作流进行解读，知识库+工作流+mcp服务，优势是速度快，劣势是由于工作流为线行运行，偶尔会出现幻觉。</p>
                <p><strong>集群解读：</strong>与最近爆火的open_claw（龙虾）架构类似，也称为蜂群模式，即多个智能体构成，线行与并行同时处理，自动调用不同的智能体处理不同的工作。准确度最高，能达到人工解读无法企及的全面性。劣势是速度很慢，一般需要10-20分钟左右。然后就是极其消耗token，与知识库、mcp服务等协同后，一次解读甚至能使用30+成本的token，建议重要问题再选择这个</p>
            <p><strong>解读风格：</strong></p>
                <p><strong>专业解析：</strong>保留了所有专业术语的解读报告，适合对大六壬了解的卦师，或者学习大六壬的人使用，能更深入的了解大六壬。</p>
                <p><strong>白话解读：</strong>去除了让普通人难以理解的专业术语，并转变为更易读懂的语言。</p>
            <blockquote>
            </blockquote>
            `,confirmText:'我明白了',isHtml:true});}})();;const taiyiPaipan=(()=>{'use strict';const INPUT_FIELDS=['name','gender','birthday','identity','question','time','mode','agent','lifetime',];const REQUEST_TRIGGER_FIELDS=new Set(['name','gender','birthday','identity','question','time','lifetime',]);const LIFETIME_QUESTION_TEXT='请从性格、运势、事业、财运、婚姻等全方面分析我的一生命运。';const UNKNOWN_BIRTHDAY_TEXT='未知';const LEGACY_DEFAULT_BIRTHDAY='2000-01-01 09:06:03';const GONG_ID_MAP={'乾':'qian','亥':'hai','子':'zi','丑':'chou','艮':'gen','戌':'xu','寅':'yin','酉':'you','卯':'mao','申':'shen','辰':'chen','坤':'kun','未':'wei','午':'wu','巳':'si','巽':'xun',};const TEN_ESSENCE_NAMES=new Set(['帝符','天皇','太尊','飞鸟','三风','五风','八风','大游','小游',]);let hasInitializedInputListeners=false;let isRestoring=false;let latestRequestId=0;document.addEventListener('DOMContentLoaded',()=>{document.addEventListener('infoInputModuleReady',init,{once:true});});async function init(){taiyiLocalStorage.initStorage();const profileInputData=captureProfileInputData();restoreInputsFromStorage();applyProfileInputData(profileInputData);normalizeBirthdayInput();initInputListener();await initInputsStorage();await refreshPaipan({silent:true});}
async function initInputsStorage(){taiyiLocalStorage.batchUpdateStorageData(buildStorageInputData());}
function buildStorageInputData(){const lifetime=getInputValue('lifetime')||taiyiLocalStorage.DEFAULT_DATA.lifetime;const question=getNormalizedQuestionValue(lifetime);return{name:getInputValue('name'),gender:getInputValue('gender'),birthday:normalizeBirthdayValue(getInputValue('birthday')),identity:getInputValue('identity'),question,time:getInputValue('time'),mode:getInputValue('mode')||taiyiLocalStorage.DEFAULT_DATA.mode,category:document.getElementById('agent')?.getAttribute('data-category')||taiyiLocalStorage.DEFAULT_DATA.category,agent:getInputValue('agent')||taiyiLocalStorage.DEFAULT_DATA.agent,lifetime,};}
function collectData(){return buildStorageInputData();}
function restoreInputsFromStorage(){const storedData=taiyiLocalStorage.getData();if(!storedData){return;}
isRestoring=true;INPUT_FIELDS.forEach((field)=>{const element=document.getElementById(field);if(!element){return;}
const value=storedData[field];if(value===undefined||value===null||value===''){return;}
element.value=value;element.setAttribute('value',value);});isRestoring=false;}
function captureProfileInputData(){return{birthday:normalizeBirthdayValue(getRawInputValue('birthday')),identity:normalizeIdentityValue(getRawInputValue('identity')),};}
function applyProfileInputData(profileInputData){setInputValue('birthday',profileInputData?.birthday||UNKNOWN_BIRTHDAY_TEXT);setInputValue('identity',profileInputData?.identity||'未知');}
function normalizeBirthdayInput(){const birthday=normalizeBirthdayValue(getRawInputValue('birthday'));setInputValue('birthday',birthday);}
function normalizeBirthdayValue(value){const birthday=String(value||'').trim();if(!birthday||birthday===LEGACY_DEFAULT_BIRTHDAY||birthday===UNKNOWN_BIRTHDAY_TEXT){return UNKNOWN_BIRTHDAY_TEXT;}
return birthday;}
function normalizeIdentityValue(value){return String(value||'').trim()||'未知';}
function initInputListener(){if(hasInitializedInputListeners){return;}
INPUT_FIELDS.forEach((field)=>{const element=document.getElementById(field);if(!element){return;}
element.addEventListener('change',async function(){if(field==='lifetime'){syncLifetimeQuestionField(this.value);}
taiyiLocalStorage.setStorageData(field,this.value);if(field==='agent'){taiyiLocalStorage.setStorageData('category',this.getAttribute('data-category')||taiyiLocalStorage.DEFAULT_DATA.category);}
if(isRestoring||!REQUEST_TRIGGER_FIELDS.has(field)){return;}
await refreshPaipan();});});const questionElement=document.getElementById('question');if(questionElement){questionElement.addEventListener('input',function(){const lifetime=getInputValue('lifetime')||taiyiLocalStorage.DEFAULT_DATA.lifetime;if(isLifetime({lifetime})){syncLifetimeQuestionField(lifetime);return;}
taiyiLocalStorage.setStorageData('question',this.value);});}
hasInitializedInputListeners=true;}
async function refreshPaipan(options={}){const data=collectData();const validationMessage=getValidationMessage(data);if(validationMessage){if(!options.silent&&typeof messageModule!=='undefined'){messageModule.info({content:validationMessage});}
return null;}
const requestId=++latestRequestId;try{const response=await requestJson('/taiyi/api/paipan/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCookie('csrftoken')},body:JSON.stringify(data)});if(requestId!==latestRequestId){return null;}
const paipanPayload=response.paipan_payload||{};updateAllPanels(paipanPayload);taiyiLocalStorage.batchUpdateStorageData({...data,baseGuaxiang:paipanPayload,markdownGuaxiang:response.markdown_guaxiang||'',});return paipanPayload;}catch(error){if(requestId!==latestRequestId){return null;}
if(!options.silent&&typeof messageModule!=='undefined'){messageModule.error({content:error.message||'太乙排盘失败'});}
return null;}}
function getValidationMessage(data){if(!isLifetime(data)&&!data.time){return'请输入占问时间';}
if(isLifetime(data)&&data.birthday===UNKNOWN_BIRTHDAY_TEXT&&!data.time){return'请输入占问时间';}
return'';}
function isLifetime(data){return String(data?.lifetime||'').toLowerCase()==='true';}
function getNormalizedQuestionValue(lifetimeValue){if(isLifetime({lifetime:lifetimeValue})){syncLifetimeQuestionField(lifetimeValue);return LIFETIME_QUESTION_TEXT;}
return getInputValue('question');}
function syncLifetimeQuestionField(lifetimeValue){if(!isLifetime({lifetime:lifetimeValue})){return;}
const questionElement=document.getElementById('question');if(!questionElement){return;}
if(questionElement.value!==LIFETIME_QUESTION_TEXT){questionElement.value=LIFETIME_QUESTION_TEXT;questionElement.setAttribute('value',LIFETIME_QUESTION_TEXT);}
taiyiLocalStorage.setStorageData('question',LIFETIME_QUESTION_TEXT);}
function updateAllPanels(data){updateGanzhi(data);updateSummary(data);updateSixteenGong(data);}
function updateGanzhi(data){const ganzhi=data['四柱干支']||{};setText('year-gz',ganzhi['年柱']||'');setText('month-gz',ganzhi['月柱']||'');setText('day-gz',ganzhi['日柱']||'');setText('hour-gz',ganzhi['时柱']||'');const xunkong=Array.isArray(data['旬空'])?data['旬空'].join(''):(data['旬空']||'');setText('xkong',xunkong);}
function updateSummary(data){setText('ju-name',data['局名']);setText('sancai',data['三才算']);setText('jiyuan',data['纪元']);setText('dingsuan',data['定算']);setText('zhusuan',data['主算']);setText('kesuan',data['客算']);}
function updateSixteenGong(data){const valueMap=buildEmptySixteenGongValueMap();const sixteenGong=data['十六宫']||{};Object.entries(sixteenGong).forEach(([gong,slots])=>{const normalizedSlots=Array.isArray(slots)?slots:['','','',''];if(gong==='中'){setSplitSlotValue(valueMap,'zhuxing-zhong','zhuxing-zhong2',normalizedSlots[0]);setSplitSlotValue(valueMap,'feijiang-zhong','feijiang-zhong2',normalizedSlots[1]);valueMap['shensha-zhong']=filterDisplayedShenshaText(normalizedSlots[2]);valueMap['bamen-zhong']=normalizeDoorText(normalizedSlots[3]);return;}
const gongId=GONG_ID_MAP[gong];if(!gongId){return;}
setSplitSlotValue(valueMap,`zhuxing-${gongId}`,`zhuxing-${gongId}2`,normalizedSlots[0]);setSplitSlotValue(valueMap,`feijiang-${gongId}`,`feijiang-${gongId}2`,normalizedSlots[1]);valueMap[`shensha-${gongId}`]=filterDisplayedShenshaText(normalizedSlots[2]);valueMap[`bamen-${gongId}`]=normalizeDoorText(normalizedSlots[3]);});Object.entries(valueMap).forEach(([id,value])=>{setText(id,value);});}
function buildEmptySixteenGongValueMap(){const valueMap={'zhuxing-zhong':'','zhuxing-zhong2':'','feijiang-zhong':'','feijiang-zhong2':'','shensha-zhong':'','bamen-zhong':'',};Object.values(GONG_ID_MAP).forEach((gongId)=>{valueMap[`zhuxing-${gongId}`]='';valueMap[`zhuxing-${gongId}2`]='';valueMap[`feijiang-${gongId}`]='';valueMap[`feijiang-${gongId}2`]='';valueMap[`shensha-${gongId}`]='';valueMap[`bamen-${gongId}`]='';});return valueMap;}
function setSplitSlotValue(valueMap,primaryId,secondaryId,rawText){const values=splitSlotText(rawText);const primaryText=values[0]||'';const secondaryText=values.slice(1).join(' ');valueMap[primaryId]=primaryText;valueMap[secondaryId]=secondaryText;}
function splitSlotText(rawText){const text=String(rawText||'').trim();if(!text){return[];}
return text.split(/\s+/).filter(Boolean);}
function filterDisplayedShenshaText(shenshaText){const text=String(shenshaText||'').trim();if(!text){return'';}
const visibleNames=text.split(/\s+/).filter((name)=>name&&!TEN_ESSENCE_NAMES.has(name));return visibleNames.join(' ');}
function normalizeDoorText(doorText){return String(doorText||'').trim();}
function setText(id,value){const element=document.getElementById(id);if(!element){return;}
const nextText=value===undefined||value===null?'':String(value);const currentText=element.textContent||'';if(currentText===nextText){return;}
element.textContent=nextText;triggerChangeAnimation(element);}
function triggerChangeAnimation(element){element.classList.remove('animate-in');void element.offsetWidth;element.classList.add('animate-in');element.addEventListener('animationend',()=>{element.classList.remove('animate-in');},{once:true});}
function getInputValue(id){const element=document.getElementById(id);return element?String(element.value||'').trim():'';}
function getRawInputValue(id){const element=document.getElementById(id);return element?String(element.value||'').trim():'';}
function setInputValue(id,value){const element=document.getElementById(id);if(!element){return;}
element.value=value||'';element.setAttribute('value',value||'');}
async function requestJson(url,options={}){const response=await fetch(url,options);let data=null;try{data=await response.json();}catch(error){if(!response.ok){throw new Error(`请求失败：${response.status}`);}
throw new Error('服务返回了无法解析的数据');}
if(!response.ok||data?.success===false){throw new Error(data?.message||`请求失败：${response.status}`);}
return data;}
return{init,initInputsStorage,collectData,refreshPaipan,renderPaipanPayload:updateAllPanels,};})();;const taiyiFetch=(()=>{'use strict';function normalizeTaskStatusResponse(data){if(!data||typeof data!=='object'){return data;}
const statusMap={PENDING:'pending',WAITING_RESOURCE:'waiting_resource',RUNNING:'processing',SUCCESS:'completed',FAILED:'failed',CANCELLED:'cancelled'};if(data.status&&statusMap[data.status]){data.status=statusMap[data.status];}
if(data.task){data.task=normalizeTaskStatusResponse(data.task);}
if(!data.result_analysis&&data.result_text){data.result_analysis=data.result_text;}
if(!data.reasoning_process&&data.reasoning_text){data.reasoning_process=data.reasoning_text;}
return data;}
function getInputValue(id){const element=document.getElementById(id);return element?element.value:'';}
function buildFeeConfirmMessage(data){const labelMap={vip_quota:'【本次使用 VIP 次数】',balance:'【本次扣除积分】',free:'【本次免费】'};const label=labelMap[data.payment_method]||'【费用确认】';return`${label}\n${data.message || '请确认是否继续解读'}`;}
function buildSubmitPayload(){let taiyiData=taiyiLocalStorage.getData()||{};const formData=typeof taiyiPaipan!=='undefined'&&typeof taiyiPaipan.collectData==='function'?taiyiPaipan.collectData():{};const selectedMode=getInputValue('mode')||taiyiLocalStorage.DEFAULT_DATA.mode;const lifetime=getInputValue('lifetime')||taiyiLocalStorage.DEFAULT_DATA.lifetime;const resolvedMode=lifetime==='true'?'single':selectedMode;taiyiData={...taiyiData,...formData,name:getInputValue('name'),gender:getInputValue('gender'),birthday:getInputValue('birthday'),identity:getInputValue('identity'),question:getInputValue('question'),time:getInputValue('time'),mode:resolvedMode,agent:getInputValue('agent')||taiyiLocalStorage.DEFAULT_DATA.agent,category:document.getElementById('agent')?.getAttribute('data-category')||taiyiLocalStorage.DEFAULT_DATA.category,lifetime,};taiyiLocalStorage.batchUpdateStorageData(taiyiData);return taiyiData;}
async function isLogin(){if(typeof window.isLogin==='function'){return await window.isLogin();}
try{const data=await taiyiUtils.requestJson('/account/api/is_login/',{method:'GET',headers:{'X-Requested-With':'XMLHttpRequest','Content-Type':'application/json','X-CSRFToken':taiyiUtils.getCookie('csrftoken')}});return data.is_login;}catch(error){return false;}}
async function confirmJieguaFee(){return true;}
async function submitTask(){const taiyiData=buildSubmitPayload();taiyiData.biz_type='taiyi';taiyiData.created_at=new Date().toISOString();taiyiLocalStorage.batchUpdateStorageData({...taiyiData,taskStartedAt:Date.now(),shareUrl:''});return taiyiUtils.requestJson('/api/ai/tasks/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':taiyiUtils.getCookie('csrftoken')},body:JSON.stringify(taiyiData)});}
async function fetchTaskStatus(taskId){const data=await taiyiUtils.requestJson(`/api/ai/tasks/${taskId}/`,{method:'GET',headers:{'X-CSRFToken':taiyiUtils.getCookie('csrftoken')}});return normalizeTaskStatusResponse(data);}
async function fetchLatestActiveTask(bizType='taiyi'){const data=await taiyiUtils.requestJson(`/api/ai/tasks/latest-active/?biz_type=${encodeURIComponent(bizType)}`,{method:'GET',headers:{'X-CSRFToken':taiyiUtils.getCookie('csrftoken')}});return normalizeTaskStatusResponse(data);}
async function fetchTempCase(tempId){return taiyiUtils.requestJson('/taiyi/api/temp_case/show/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':taiyiUtils.getCookie('csrftoken')},body:JSON.stringify({temp_id:tempId})});}
async function cancelTask(taskId){return taiyiUtils.requestJson(`/api/ai/tasks/${taskId}/cancel/`,{method:'POST',headers:{'X-CSRFToken':taiyiUtils.getCookie('csrftoken')}});}
return{buildSubmitPayload,isLogin,confirmJieguaFee,submitTask,fetchTaskStatus,fetchLatestActiveTask,cancelTask,fetchTempCase,};})();;const taiyiJieguaAsync=(()=>{'use strict';const STATUS=taiyiLocalStorage.STATUS;let websocket=null;let isProcessing=false;document.addEventListener('DOMContentLoaded',init);function init(){taiyiLocalStorage.initStorage();taiyiUI.setBtnState('enable');taiyiUI.resetResultActions();taiyiUI.bindAgentPanelEvents();const jieguaBtn=document.getElementById('jiegua');if(jieguaBtn){jieguaBtn.addEventListener('click',jiegua);}}
async function jiegua(){if(isProcessing){await cancelCurrentTask();return;}
if(!await taiyiFetch.isLogin()){messageModule.error({content:'请先登录后再进行解读。'});return;}
const taskData=taiyiFetch.buildSubmitPayload();if(!taskData.markdownGuaxiang){messageModule.error({content:'请先完成排盘后再解读'});return;}
if(!await taiyiFetch.confirmJieguaFee()){return;}
resetContentStore();taiyiUI.setBtnState('loading');isProcessing=true;try{const data=await taiyiFetch.submitTask();if(!data.success||!data.task_id){throw new Error(data.message||'提交解读任务失败');}
taiyiLocalStorage.batchUpdateStorageData({taskId:data.task_id,status:STATUS.PENDING});connectToWebSocket(data.task_id);}catch(error){handleTaskError(error.message||'提交解读任务失败');}}
function connectToWebSocket(taskId){closeWebSocket();const sseUrl=`/api/ai/tasks/${taskId}/stream`;websocket=new EventSource(sseUrl);websocket.onopen=function(){taiyiUI.updateTips('已链接智能体，正在等待解读...');};websocket.onmessage=function(event){try{const data=JSON.parse(event.data);handleTaskStreamMessage(data);}catch(error){console.warn('解析太乙任务消息失败:',error);}};websocket.onerror=function(){websocket.close();websocket=null;handleTaskError('连接中断，请刷新页面重试');};}
function handleTaskStreamMessage(data){switch(data.type){case'init':case'phase':taiyiUI.updateTips(data.content||data.message||'正在解读...');return;case'reasoning':taiyiLocalStorage.updateStorageData('reasoningProcess',data.content||'');renderReasoning();return;case'token':case'answer':taiyiLocalStorage.updateStorageData('resultAnalysis',data.content||'');renderResult();return;case'status':handleStatusMessage(data);return;case'done':handleTaskComplete();return;case'error':handleTaskError(data.content||'智能体服务出现错误');return;default:return;}}
function normalizeTaskStatus(status){const statusMap={PENDING:STATUS.PENDING,WAITING_RESOURCE:STATUS.WAITING_RESOURCE,RUNNING:STATUS.PROCESSING,SUCCESS:STATUS.COMPLETED,FAILED:STATUS.FAILED,CANCELLED:STATUS.CANCELLED,pending:STATUS.PENDING,waiting_resource:STATUS.WAITING_RESOURCE,processing:STATUS.PROCESSING,completed:STATUS.COMPLETED,failed:STATUS.FAILED,cancelled:STATUS.CANCELLED};return statusMap[status]||status;}
function handleStatusMessage(data){const normalizedStatus=normalizeTaskStatus(data.status||data.content);if(normalizedStatus===STATUS.COMPLETED){handleTaskComplete();return;}
if(normalizedStatus===STATUS.WAITING_RESOURCE){taiyiLocalStorage.setStorageData('status',STATUS.WAITING_RESOURCE);taiyiUI.updateTips('当前智能体已满载，正在链接空闲智能体...');return;}
if(normalizedStatus===STATUS.PENDING||normalizedStatus===STATUS.PROCESSING){taiyiLocalStorage.setStorageData('status',normalizedStatus);const progress=Number(data.progress||0);if(progress>0){taiyiUI.updateTips(`智能体正在解读，当前进度 ${progress}%...`);}
return;}
if(normalizedStatus===STATUS.CANCELLED){handleTaskCancelled(data.error_message||data.message||data.content||'任务已取消');return;}
if(normalizedStatus===STATUS.FAILED){handleTaskError(data.error_message||data.message||data.content||'任务失败，请稍后重试');}}
function renderReasoning(){const reasoningContainer=document.getElementById('debate-round-0');if(!reasoningContainer){return;}
reasoningContainer.innerHTML=taiyiUtils.renderMarkdownSafe(taiyiLocalStorage.getKeyData('reasoningProcess')||'');}
function renderResult(){const result=document.getElementById('result');if(!result){return;}
result.innerHTML=taiyiUtils.renderMarkdownSafe(taiyiLocalStorage.getKeyData('resultAnalysis')||'');const summaryContainer=document.getElementById('debate-round-1');if(summaryContainer){summaryContainer.innerHTML=result.innerHTML;}}
async function handleTaskComplete(){isProcessing=false;closeWebSocket();const taskId=taiyiLocalStorage.getKeyData('taskId');if(taskId){try{const status=await taiyiFetch.fetchTaskStatus(taskId);taiyiLocalStorage.batchUpdateStorageData({status:STATUS.COMPLETED,tempCaseId:status.temp_case_id||'',reasoningProcess:status.reasoning_process||taiyiLocalStorage.getKeyData('reasoningProcess')||'',resultAnalysis:status.result_analysis||taiyiLocalStorage.getKeyData('resultAnalysis')||'',});}catch(error){taiyiLocalStorage.setStorageData('status',STATUS.COMPLETED);}}else{taiyiLocalStorage.setStorageData('status',STATUS.COMPLETED);}
renderReasoning();renderResult();taiyiUI.updateTips('智能体解读完成，结果仅供参考',false);taiyiUI.setBtnState('success');taiyiUI.showAppraisePanel();taiyiUI.enableSaveAction();}
function handleTaskError(message){isProcessing=false;closeWebSocket();taiyiLocalStorage.setStorageData('status',STATUS.FAILED);taiyiUI.setBtnState('enable');taiyiUI.resetResultActions();messageModule.error({content:message||'智能体服务出现错误'});}
function handleTaskCancelled(message){isProcessing=false;closeWebSocket();taiyiLocalStorage.setStorageData('status',STATUS.CANCELLED);taiyiUI.setBtnState('enable');taiyiUI.resetResultActions();taiyiUI.updateTips('任务已取消');messageModule.info({content:message||'任务已取消'});}
async function cancelCurrentTask(){const taskId=taiyiLocalStorage.getKeyData('taskId');if(!taskId){isProcessing=false;closeWebSocket();taiyiUI.setBtnState('enable');return;}
taiyiUI.setBtnState('cancelling');try{const response=await taiyiFetch.cancelTask(taskId);if(response&&response.success){handleTaskCancelled(response.message||'任务已取消');return;}
messageModule.warning({content:response?.message||'取消任务失败，请稍后重试'});if(isProcessing){taiyiUI.setBtnState('loading');}}catch(error){console.error('取消任务失败:',error);messageModule.error({content:'取消任务失败，请稍后重试'});if(isProcessing){taiyiUI.setBtnState('loading');}}}
function closeWebSocket(){if(websocket){websocket.close();websocket=null;}}
function resetContentStore(){taiyiLocalStorage.resetTaskRuntimeData();const result=document.getElementById('result');const reasoning=document.getElementById('debate-round-0');const summary=document.getElementById('debate-round-1');if(result){result.innerHTML='';}
if(reasoning){reasoning.innerHTML='';}
if(summary){summary.innerHTML='';}
taiyiUI.hideSharePanel();}
return{connectToWebSocket,};})();;(()=>{'use strict';const saveBtn=document.getElementById('save');if(saveBtn){saveBtn.addEventListener('click',saveTaiyiCase);}
async function saveTaiyiCase(){taiyiUI.setSaveLoading();const taskData=taiyiLocalStorage.getData();if(!taskData||taskData.status!==taiyiLocalStorage.STATUS.COMPLETED||!String(taskData.resultAnalysis||'').trim()){taiyiUI.enableSaveAction();messageModule.error({content:'请先完成解读后再保存'});return;}
const payload=taiyiFetch.buildSubmitPayload();const caseData={question:payload.question||'',querent:payload.name||'',created_at:taskData.created_at||new Date().toISOString(),time:payload.time||payload.birthday||'',reasoning_process:taskData.reasoningProcess||'',result_analysis:taskData.resultAnalysis||'',base_guaxiang:payload.baseGuaxiang||taskData.baseGuaxiang||'',markdown_guaxiang:payload.markdownGuaxiang||taskData.markdownGuaxiang||'',rating:getRating(),is_public:getIsPublic(),temp_case_id:taskData.tempCaseId||''};try{const data=await taiyiUtils.requestJson('/taiyi/api/save_case/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':taiyiUtils.getCookie('csrftoken')},body:JSON.stringify(caseData)});taiyiLocalStorage.batchUpdateStorageData({caseId:data.case_id,shareUrl:''});taiyiUI.markSaveCompleted();taiyiUI.enableShareAction();taiyiUI.enableFollowAction();messageModule.toast({content:'保存成功'});}catch(error){taiyiUI.enableSaveAction();messageModule.error({content:error.message||'保存失败'});}}
function getRating(){const ratingElement=document.getElementById('appraise-rating-input');const parsedValue=parseFloat(ratingElement?.value||'8.0');return Number.isFinite(parsedValue)&&parsedValue>=1?parsedValue:8.0;}
function getIsPublic(){const isOpenElement=document.getElementById('case-is-open');return isOpenElement?taiyiUtils.toBoolean(isOpenElement.getAttribute('data-open')):false;}})();;(()=>{'use strict';const shareBtn=document.getElementById('share');if(shareBtn){shareBtn.addEventListener('click',startShare);}
async function startShare(){const sharedUrl=taiyiLocalStorage.getKeyData('shareUrl');if(sharedUrl){taiyiUI.showSharePanel(sharedUrl);await copyToClipboard(sharedUrl);taiyiUI.enableShareAction('复制链接');return;}
taiyiUI.setShareLoading();try{const caseId=taiyiLocalStorage.getKeyData('caseId');if(!caseId){throw new Error('请先保存太乙卦例');}
const data=await taiyiUtils.requestJson('/taiyi/api/share_case/',{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':taiyiUtils.getCookie('csrftoken')},body:JSON.stringify({case_id:caseId})});taiyiLocalStorage.setStorageData('shareUrl',data.share_url||'');taiyiUI.showSharePanel(data.share_url||'');await copyToClipboard(data.share_url||'');taiyiUI.enableShareAction('复制链接');}catch(error){taiyiUI.enableShareAction();messageModule.error({content:error.message||'分享失败'});}}
async function copyToClipboard(text){if(!text){return;}
if(navigator.clipboard){try{await navigator.clipboard.writeText(text);messageModule.toast({content:'分享链接已复制到剪贴板'});return;}catch(error){}}
const textarea=document.createElement('textarea');textarea.value=text;textarea.style.position='fixed';textarea.style.opacity='0';document.body.appendChild(textarea);textarea.focus();textarea.select();document.execCommand('copy');document.body.removeChild(textarea);messageModule.toast({content:'分享链接已复制到剪贴板'});}})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',init);function init(){const followBtn=document.getElementById('follow');if(!followBtn){return;}
followBtn.addEventListener('click',handleFollowClick);}
function handleFollowClick(){const followBtn=document.getElementById('follow');if(!followBtn||followBtn.classList.contains('disabled')){return;}
const taskData=taiyiLocalStorage.getData()||{};const hasResult=taskData.status===taiyiLocalStorage.STATUS.COMPLETED&&Boolean(String(taskData.resultAnalysis||'').trim());if(!hasResult){return;}
openFollowDialog(taskData,'你是一位精通太乙神数的解卦大师。用户之前已经得到了一次完整的太乙神数解读，现在用户有追问。请基于之前的盘象和解读，回答用户的追问。');}
function openFollowDialog(taskData,systemPromptBase){closeFollowDialog();const overlay=document.createElement('div');overlay.id='follow-overlay';overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;';const panel=document.createElement('div');panel.id='follow-panel';panel.style.cssText='border-radius:10px;width:100%;max-width:680px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 32px 0 rgba(0,0,0,0.37);backdrop-filter:blur(10px) saturate(180%);-webkit-backdrop-filter:blur(10px) saturate(180%);background:rgba(var(--bg-rgb-2),0.92);color:var(--text-color-1);border:1px solid var(--border-color-1);';const header=document.createElement('div');header.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border-color-1);';const title=document.createElement('span');title.textContent='追问解读';title.style.cssText='font-size:15px;font-weight:600;color:var(--text-color-1);';header.appendChild(title);const closeBtn=document.createElement('button');closeBtn.textContent='✕';closeBtn.style.cssText='background:none;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;cursor:pointer;color:var(--text-color-1);padding:4px 10px;transition:color .3s,border-color .3s;';closeBtn.onmouseenter=function(){this.style.color='var(--primary-color)';this.style.borderColor='var(--primary-color)';};closeBtn.onmouseleave=function(){this.style.color='var(--text-color-1)';this.style.borderColor='var(--border-color-1)';};closeBtn.onclick=closeFollowDialog;header.appendChild(closeBtn);panel.appendChild(header);const body=document.createElement('div');body.style.cssText='flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;';const resultLabel=document.createElement('div');resultLabel.style.cssText='font-size:12px;color:var(--text-color-disabled);margin-bottom:2px;';resultLabel.textContent='原始解读';body.appendChild(resultLabel);const resultBox=document.createElement('div');resultBox.style.cssText='border-radius:5px;border:1px solid var(--border-color-1);padding:12px;font-size:13px;line-height:1.7;max-height:180px;overflow-y:auto;white-space:pre-wrap;color:var(--text-color-1);background:rgba(var(--bg-rgb-1),0.03);scrollbar-width:thin;';resultBox.textContent=taskData.resultAnalysis||'暂无';body.appendChild(resultBox);const answerBox=document.createElement('div');answerBox.id='follow-answer';answerBox.style.cssText='display:none;border-radius:5px;border:1px solid var(--border-color-1);padding:12px;font-size:14px;line-height:1.8;white-space:pre-wrap;max-height:260px;overflow-y:auto;color:var(--text-color-1);background:rgba(var(--bg-rgb-1),0.03);scrollbar-width:thin;';body.appendChild(answerBox);panel.appendChild(body);const footer=document.createElement('div');footer.style.cssText='padding:12px 20px;border-top:1px solid var(--border-color-1);display:flex;gap:8px;align-items:flex-end;';const textarea=document.createElement('textarea');textarea.id='follow-input';textarea.placeholder='输入追问内容...';textarea.style.cssText='flex:1;min-height:44px;max-height:100px;padding:10px 12px;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;resize:none;outline:none;font-family:inherit;color:var(--text-color-1);background:transparent;transition:border-color .3s;';textarea.addEventListener('focus',function(){this.style.borderColor='var(--primary-color)';});textarea.addEventListener('blur',function(){this.style.borderColor='var(--border-color-1)';});textarea.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendFollowUp(taskData,systemPromptBase);}});const sendBtn=document.createElement('button');sendBtn.id='follow-send';sendBtn.textContent='发送';sendBtn.style.cssText='padding:10px 20px;border:1px solid var(--border-color-1);border-radius:10px;font-size:14px;cursor:pointer;white-space:nowrap;color:var(--text-color-1);background:transparent;transition:color .3s,border-color .3s,background-color .3s;';sendBtn.onmouseenter=function(){this.style.color='var(--primary-color)';this.style.borderColor='var(--primary-color)';};sendBtn.onmouseleave=function(){this.style.color='var(--text-color-1)';this.style.borderColor='var(--border-color-1)';};sendBtn.onclick=function(){sendFollowUp(taskData,systemPromptBase);};footer.appendChild(textarea);footer.appendChild(sendBtn);panel.appendChild(footer);overlay.appendChild(panel);overlay.addEventListener('click',function(e){if(e.target===overlay)closeFollowDialog();});document.body.appendChild(overlay);textarea.focus();}
function closeFollowDialog(){const overlay=document.getElementById('follow-overlay');if(overlay)overlay.remove();}
function sendFollowUp(taskData,systemPromptBase){const input=document.getElementById('follow-input');const answerBox=document.getElementById('follow-answer');const sendBtn=document.getElementById('follow-send');if(!input||!answerBox||!sendBtn)return;const question=input.value.trim();if(!question)return;sendBtn.disabled=true;sendBtn.textContent='思考中...';sendBtn.style.opacity='0.5';sendBtn.style.cursor='not-allowed';input.disabled=true;answerBox.style.display='block';answerBox.textContent='';const systemPrompt=systemPromptBase+'\n\n之前的盘象信息：\n'+(typeof taskData.baseGuaxiang==='string'?taskData.baseGuaxiang:JSON.stringify(taskData.baseGuaxiang||{}))+'\n\n之前的解读结果：\n'+(taskData.resultAnalysis||'无')+'\n\n请用中文回答，保持专业但易懂。';fetch('/api/ai/follow-up',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({system_prompt:systemPrompt,user_message:question})}).then(function(response){if(!response.ok)throw new Error('请求失败');const reader=response.body.getReader();const decoder=new TextDecoder();let fullText='';function readChunk(){reader.read().then(function(result){if(result.done){sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;input.value='';return;}
const chunk=decoder.decode(result.value,{stream:true});const lines=chunk.split('\n');for(let i=0;i<lines.length;i++){if(lines[i].startsWith('data: ')){try{const data=JSON.parse(lines[i].slice(6));if(data.content){fullText+=data.content;answerBox.textContent=fullText;answerBox.scrollTop=answerBox.scrollHeight;}}catch(e){}}}
readChunk();}).catch(function(){sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;});}
readChunk();}).catch(function(){answerBox.textContent='请求失败，请重试';sendBtn.disabled=false;sendBtn.textContent='发送';sendBtn.style.opacity='';sendBtn.style.cursor='';input.disabled=false;});}})();;(()=>{'use strict';const resetBtn=document.getElementById('reset');if(!resetBtn){return;}
resetBtn.addEventListener('click',()=>{taiyiLocalStorage.resetStorage();window.location.href='/taiyi/';});})();;(()=>{'use strict';document.addEventListener('DOMContentLoaded',()=>{document.addEventListener('infoInputModuleReady',init,{once:true});});async function init(){const tempId=new URLSearchParams(window.location.search).get('temp_id');if(tempId){await restoreFromTempCase(tempId);return;}
await restorePendingTaskIfNeeded();}
async function restoreFromTempCase(tempId){try{const data=await taiyiFetch.fetchTempCase(tempId);if(!data.success||!data.case){return;}
const caseData=data.case;const nextTaskData={...taiyiLocalStorage.DEFAULT_DATA,tempCaseId:caseData.id||'',status:caseData.result_analysis?taiyiLocalStorage.STATUS.COMPLETED:taiyiLocalStorage.STATUS.NONE,baseGuaxiang:caseData.base_guaxiang||'',markdownGuaxiang:caseData.markdown_guaxiang||'',reasoningProcess:caseData.reasoning_process||'',resultAnalysis:caseData.result_analysis||'',agent:caseData.ai_agent||taiyiLocalStorage.DEFAULT_DATA.agent,category:caseData.ai_category||taiyiLocalStorage.DEFAULT_DATA.category,};taiyiLocalStorage.replaceStorage(nextTaskData);await restoreFormAndPaipan(nextTaskData);renderSnapshot(nextTaskData);}catch(error){console.warn('恢复太乙缓存失败:',error);}}
async function restorePendingTaskIfNeeded(){const taskData=taiyiLocalStorage.getData();if(!taskData||!taskData.taskId||taskData.status===taiyiLocalStorage.STATUS.NONE){return;}
await restoreFormAndPaipan(taskData);renderSnapshot(taskData);if(taskData.status===taiyiLocalStorage.STATUS.PENDING||taskData.status===taiyiLocalStorage.STATUS.WAITING_RESOURCE||taskData.status===taiyiLocalStorage.STATUS.PROCESSING){isProcessing=true;taiyiUI.setBtnState('loading');taiyiJieguaAsync.connectToWebSocket(taskData.taskId);}}
async function restoreFormAndPaipan(taskData){restoreModeField(taskData.mode);if(taskData.baseGuaxiang){await restoreFromBaseGuaxiang(taskData.baseGuaxiang,taskData.agent,taskData.category);return;}
restoreFormFields(taskData);renderStoredPaipan(taskData.baseGuaxiang);}
function restoreModeField(mode=taiyiLocalStorage.DEFAULT_DATA.mode){const modeElement=document.getElementById('mode');if(modeElement&&mode){modeElement.value=mode;}}
function restoreAgentFields(agent=null,category=null){const agentElement=document.getElementById('agent');if(!agentElement){return;}
if(agent){agentElement.value=agent;}
if(category){agentElement.setAttribute('data-category',category);}}
async function restoreFromBaseGuaxiang(baseGuaxiang,agent=null,category=null){const guaxiang=taiyiUtils.parseBaseGuaxiang(baseGuaxiang);if(!guaxiang||typeof guaxiang!=='object'){return;}
const formFieldMap={name:guaxiang['占问人']||guaxiang['姓名']||'',gender:guaxiang['性别']||'',birthday:guaxiang['生日']||'',identity:guaxiang['身份']||'',question:guaxiang['占问问题']||'',time:guaxiang['占问时间']||'',lifetime:String(Boolean(guaxiang['生日']&&!guaxiang['占问时间'])).toLowerCase(),};restoreFormFields(formFieldMap);restoreAgentFields(agent,category);renderStoredPaipan(guaxiang);}
function restoreFormFields(taskData){Object.entries(taskData||{}).forEach(([field,value])=>{const element=document.getElementById(field);if(!element||value===undefined||value===null||value===''){return;}
element.value=value;element.setAttribute('value',value);});}
function renderStoredPaipan(baseGuaxiang){if(typeof taiyiPaipan==='undefined'||typeof taiyiPaipan.renderPaipanPayload!=='function'){return;}
const payload=taiyiUtils.parseBaseGuaxiang(baseGuaxiang);if(payload&&typeof payload==='object'){taiyiPaipan.renderPaipanPayload(payload);}}
function renderSnapshot(taskData){const result=document.getElementById('result');const reasoning=document.getElementById('debate-round-0');const summary=document.getElementById('debate-round-1');if(result){result.innerHTML=taiyiUtils.renderMarkdownSafe(taskData.resultAnalysis||'');}
if(reasoning){reasoning.innerHTML=taiyiUtils.renderMarkdownSafe(taskData.reasoningProcess||'');}
if(summary){summary.innerHTML=taiyiUtils.renderMarkdownSafe(taskData.resultAnalysis||'');}
if(taskData.status===taiyiLocalStorage.STATUS.COMPLETED){taiyiUI.setBtnState('success');taiyiUI.showAppraisePanel();taiyiUI.enableSaveAction();}
if(taskData.caseId){taiyiUI.markSaveCompleted();taiyiUI.enableShareAction(taskData.shareUrl?'复制链接':'分享');taiyiUI.enableFollowAction();}}})();;(()=>{'use strict';const qiguaBtn=document.getElementById('qigua');if(!qiguaBtn){return;}
qiguaBtn.addEventListener('click',huoshiQigua);function huoshiQigua(){const timeElement=document.getElementById('time');if(!timeElement){return;}
const now=new Date();const formattedTime=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-')+' '+[String(now.getHours()).padStart(2,'0'),String(now.getMinutes()).padStart(2,'0'),String(now.getSeconds()).padStart(2,'0')].join(':');timeElement.value=formattedTime;timeElement.setAttribute('value',formattedTime);timeElement.dispatchEvent(new Event('change',{bubbles:true}));}})();;