import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'hash',
	base: process.env.BASE_URL,

  routes: [
  {
		path: '/',
		name: '',
		component: () => import('./login.vue')
	}, {
		path: '/admin/',
		name: 'adminLogin',
    meta: {
            roles: ['admin']
        },
		component: () => import('./adminlogin.vue')
	},  {
		path: '/money/',
		name: 'moneyLogin',
    meta: {
            roles: ['admin']
        },
		component: () => import('./moneylogin.vue')
	},  {
		path: '/staff/',
		name: 'staffLogin',
    meta: {
            roles: ['staff']
        },
		component: () => import('./stafflogin.vue')
	},
	{
		path: '/adminindex',
		name: 'adminindex',
    meta: {
            roles: ['admin']
        },
		component: () => import('./adminindex.vue'),
		children: [{
				path: '/',
				name: '',
				component: () => import('./views/adminindex.vue')
			},
			{
				path: '/adminindex/adminSelect',
				name: 'adminSelect',
				component: () => import('./components/admin/select.vue')
			},
      	{
				path: '/adminindex/shipperInformationSelect',
				name: 'shipperInformationSelect',
				component: () => import('./components/shipperInformation/select.vue')
			},{
				path: '/adminindex/staffSelect',
				name: 'staffSelect',
				component: () => import('./components/staff/select.vue')
			}, {
				path: '/adminindex/waybillSelect',
				name: 'waybillSelect',
				component: () => import('./components/waybill/select.vue')
			}, {
				path: '/adminindex/waybillSelectysz',
				name: 'waybillSelectysz',
				component: () => import('./components/waybill/selectysz.vue')
			}, {
				path: '/adminindex/waybillSelectywc',
				name: 'waybillSelectywc',
				component: () => import('./components/waybill/selectywc.vue')
			}, {
				path: '/adminindex/waybillSelectdys',
				name: 'waybillSelectdys',
				component: () => import('./components/waybill/selectdys.vue')
			},
			 {
				path: '/adminindex/ddtj',
				name: 'ddtj',
				component: () => import('./components/baobiao/ddtj.vue')
			}, {
				path: '/adminindex/khcztj',
				name: 'khcztj',
				component: () => import('./components/baobiao/khcztj.vue')
			}, {
				path: '/adminindex/sjcztj',
				name: 'sjcztj',
				component: () => import('./components/baobiao/sjcztj.vue')
			},
		]
	},
		{
		path: '/moneyindex',
		name: 'moneyindex',
    meta: {
            roles: ['admin']
        },
		component: () => import('./moneyindex.vue'),
		children: [{
				path: '/',
				name: '',
				component: () => import('./views/moneyindex.vue')
			},
			// {
			// 	path: '/moneyindex/moneySelect',
			// 	name: 'moneySelect',
			// 	component: () => import('./components/money/select.vue')
			// },
    		{
				path: '/moneyindex/staffSelect',
				name: 'staffSelect',
				component: () => import('./components/staff/select.vue')
			},
      {
				path: '/moneyindex/networkSelect',
				name: 'networkSelect',
				component: () => import('./components/network/select.vue')
			},
      {
				path: '/moneyindex/staffSelect',
				name: 'staffSelect',
				component: () => import('./components/staff/select.vue')
			},{
				path: '/moneyindex/customerSelect',
				name: 'customerSelect',
				component: () => import('./components/customer/select.vue')
			},{
				path: '/moneyindex/reportSelect',
				name: 'reportSelect',
				component: () => import('./components/report/select.vue')
			},
			// {
			// 	path: '/moneyindex/evaluationInformationSelect',
			// 	name: 'evaluationInformationSelect',
			// 	component: () => import('./components/evaluationInformation/select.vue')
			// },

			// {
			// 	path: '/moneyindex/shipperInformationSelect',
			// 	name: 'shipperInformationSelect',
			// 	component: () => import('./components/shipperInformation/select.vue')
			// },

			// {
			// 	path: '/moneyindex/vehicleSelect',
			// 	name: 'vehicleSelect',
			// 	component: () => import('./components/vehicle/select.vue')
			// }, {
			// 	path: '/moneyindex/vehicleInfoSelect',
			// 	name: 'vehicleInfoSelect',
			// 	component: () => import('./components/vehicleInfo/select.vue')
			// },
			 {
				path: '/moneyindex/waybillSelect',
				name: 'waybillSelect',
				component: () => import('./components/waybill/select.vue')
			}, {
				path: '/moneyindex/waybillSelectysz',
				name: 'waybillSelectysz',
				component: () => import('./components/waybill/selectysz.vue')
			}, {
				path: '/moneyindex/waybillSelectywc',
				name: 'waybillSelectywc',
				component: () => import('./components/waybill/selectywc.vue')
			}, {
				path: '/moneyindex/waybillSelectdys',
				name: 'waybillSelectdys',
				component: () => import('./components/waybill/selectdys.vue')
			},
		 {
				path: '/moneyindex/ddtj',
				name: 'ddtj',
				component: () => import('./components/baobiao/ddtj.vue')
			}, {
				path: '/moneyindex/khcztj',
				name: 'khcztj',
				component: () => import('./components/baobiao/khcztj.vue')
			}, {
				path: '/moneyindex/sjcztj',
				name: 'sjcztj',
				component: () => import('./components/baobiao/sjcztj.vue')
			},  {
				path: '/moneyindex/templateManager',
				name: 'waybillSelectdys',
				component: () => import('./components/template/manager.vue')
			}
		]
	},
  {
		path: '/staffindex',
		name: 'staffindex',
    meta: {
            roles: ['admin']
        },
		component: () => import('./staffindex.vue'),
		children: [{
				path: '/',
				name: '',
				component: () => import('./views/staffindex.vue')
			},

      {
      path: '/staffindex/templateManage',
      name: 'templateManage',
      component: () => import('./components/template/manager.vue')
      },
      {
				path: '/staffindex/waybillSelect',
				name: 'waybillSelect',
				component: () => import('./components/waybill/select.vue')
			}, {
				path: '/staffindex/waybillSelectysz',
				name: 'waybillSelectysz',
				component: () => import('./components/waybill/selectysz.vue')
			}, {
				path: '/staffindex/waybillSelectywc',
				name: 'waybillSelectywc',
				component: () => import('./components/waybill/selectywc.vue')
			}, {
				path: '/staffindex/waybillSelectdys',
				name: 'waybillSelectdys',
				component: () => import('./components/waybill/selectdys.vue')
			},
       {
				path: '/staffindex/templateManager',
				name: 'waybillSelectdys',
				component: () => import('./components/template/manager.vue')
			},
      {
				path: '/staffindex/templateInfo',
				name: 'waybillSelectdys',
				component: () => import('./components/template/info.vue')
			},
      {
				path: '/staffindex/ddtj',
				name: 'ddtj',
				component: () => import('./components/baobiao/ddtj.vue')
			}, {
				path: '/staffindex/khcztj',
				name: 'khcztj',
				component: () => import('./components/baobiao/khcztj.vue')
			}, {
				path: '/staffindex/sjcztj',
				name: 'sjcztj',
				component: () => import('./components/baobiao/sjcztj.vue')
			},
      {
			path: '/staffindex/ksxd',
			name: 'ksxd',
			component: () => import('./componentskh/xdgl/ksxd.vue')
		}, {
			path: '/staffindex/ddglSelect',
			name: 'ddglSelect',
			component: () => import('./componentskh/ddgl/select.vue')
		}, {
			path: '/staffindex/ddglSelectdys',
			name: 'ddglSelectdys',
			component: () => import('./componentskh/ddgl/selectdys.vue')
		}, {
			path: '/staffindex/ddglSelectywc',
			name: 'ddglSelectywc',
			component: () => import('./componentskh/ddgl/selectywc.vue')
		}, {
			path: '/staffindex/ddglSelectysz',
			name: 'ddglSelectysz',
			component: () => import('./componentskh/ddgl/selectysz.vue')
		}, {
			path: '/grzl/wdxx',
			name: 'ddglwdxx',
			component: () => import('./componentskh/grzl/wdxx.vue')
		}, {
			path: '/grzl/wdyk',
			name: 'ddglwdyk',
			component: () => import('./componentskh/grzl/wdyk.vue')
		}, {
			path: '/grzl/xtsz',
			name: 'xtsz',
			component: () => import('./componentskh/grzl/xtsz.vue')
    }
		]
	}]
})



