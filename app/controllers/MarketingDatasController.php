<?php

class MarketingDatasController extends \BaseController
{

    public function getIndexOneView()
    {
        return View::make('marketing_datas.index_one');
    }

    public function getIndexTwoView()
    {
        return View::make('marketing_datas.index_two');
    }

    public function getIndexThreeView()
    {
        return View::make('marketing_datas.index_three');
    }


    public function getTimezoneWiseDataView($id)
    {
        $id = Helper::simple_decrypt($id);
        $data1 = MarketingData::leftJoin('marketing_states', 'marketing_states.marketing_states_id', '=', 'marketing_datas.marketing_states_id')
            ->leftJoin('leads_statuses', 'leads_statuses.leads_statuses_id', '=', 'marketing_datas.leads_statuses_id')
            ->where('marketing_states.timezones_id', '=', $id)->get();
        $returndata = [];
        foreach ($data1 as $k => $v) {
            $id = Helper::simple_encrypt($v->marketing_datas_id);
            $returndata[$k]['marketing_datas_id'] = $v->marketing_datas_id;
            $returndata[$k]['owner_name'] = $v->owner_name;
            $returndata[$k]['company_name'] = $v->company_name;
            $returndata[$k]['website'] = $v->website;
            $returndata[$k]['phone'] = $v->phone;
            $returndata[$k]['email'] = $v->email;
            $returndata[$k]['leads_statuses_id'] = "<button ng-click='changeStatus()' class='stat' >$v->leads_statuses_name</button>";
            $returndata[$k]['edit'] = "<a href='#/app/marketing_states/edit/$id'><button class='btn btn-rounded btn-sm btn-icon btn-primary'><i class='fa fa-search-plus'></i></button></a>";
            $returndata[$k]['delete'] = "<a href='#/app/marketing_states/delete/$id'><button class='btn btn-sm btn-icon btn-danger'><i class='fa fa-edit'></i></button></i></button></a>";
        }

        $data['aaData'] = $returndata;
//        $data['lead_status'] = LeadsStatus::select('leads_statuses_name', 'leads_statuses_id')->get();
        return $data;
    }
    public function postTimezoneWiseDataFilteredView($id)
    {
        $id = Helper::simple_decrypt($id);
        if(Input::get('leads_statuses_id') != '')
        {
            $data1 = MarketingData::leftJoin('marketing_states', 'marketing_states.marketing_states_id', '=', 'marketing_datas.marketing_states_id')
                ->leftJoin('leads_statuses', 'leads_statuses.leads_statuses_id', '=', 'marketing_datas.leads_statuses_id')
                ->where('marketing_states.timezones_id', '=', $id)
                ->where('leads_statuses.leads_statuses_id', '=', Input::get('leads_statuses_id'))
                ->get();
        }
        else
        {
            $data1 = MarketingData::leftJoin('marketing_states', 'marketing_states.marketing_states_id', '=', 'marketing_datas.marketing_states_id')
                ->leftJoin('leads_statuses', 'leads_statuses.leads_statuses_id', '=', 'marketing_datas.leads_statuses_id')
                ->where('marketing_states.timezones_id', '=', $id)
                ->get();
        }

        $returndata = [];
        foreach ($data1 as $k => $v) {
            $id = Helper::simple_encrypt($v->marketing_datas_id);
            $returndata[$k]['marketing_datas_id'] = $v->marketing_datas_id;
            $returndata[$k]['owner_name'] = $v->owner_name;
            $returndata[$k]['company_name'] = $v->company_name;
            $returndata[$k]['website'] = $v->website;
            $returndata[$k]['phone'] = $v->phone;
            $returndata[$k]['email'] = $v->email;
            $returndata[$k]['leads_statuses_id'] = $v->leads_statuses_id;
            $returndata[$k]['marketing_datas_id_encrpt'] = $id;
        }

        $data['aaData'] = $returndata;

//        $data['lead_status'] = LeadsStatus::select('leads_statuses_name', 'leads_statuses_id')->get();
        return $data;
    }

    public function getCreateOneAdd()
    {
        return View::make('marketing_datas.create_one');
    }

    public function postStatusUpdateEdit($id)
    {
        $id = Helper::simple_decrypt($id);
        $data = MarketingData::find($id);
        $data->leads_statuses_id = Input::get('leadstatus');
        $save = $data->save();
        if ($save) {
            return json_encode([
                'code' => 200,
                'msg' => Config::get('constants.store_record_msg'),
                'result' => null
            ]);
        } else {
            return json_encode([
                'code' => 403,
                'msg' => Config::get('constants.error_record_msg'),
                'result' => null
            ]);
        }
    }

    public function postCountriesAdd()
    {
        $data['countries'] = MarketingCountry::select(DB::raw('count(marketing_datas.marketing_states_id) as data_count, marketing_countries.*'))
            ->leftJoin('marketing_states', 'marketing_states.marketing_countries_id', '=', 'marketing_countries.marketing_countries_id')
            ->leftJoin('marketing_datas', 'marketing_states.marketing_states_id', '=', 'marketing_datas.marketing_states_id')
            ->groupBy('marketing_countries.marketing_countries_id')->get();

        foreach ($data['countries'] as $key => $val) {
            $data['countries'][$key]->marketing_countries_id = Helper::simple_encrypt($data['countries'][$key]->marketing_countries_id);
        }
//        $data['categories'] = MarketingCategory::select('marketing_categories_name', 'marketing_categories_id')->get();
        return json_encode($data);
    }

    public function postCountriesView()
    {

        $data['countries'] = MarketingCountry::select(DB::raw('count(marketing_datas.marketing_states_id) as data_count, marketing_countries.*'))
            ->leftJoin('marketing_states', 'marketing_states.marketing_countries_id', '=', 'marketing_countries.marketing_countries_id')
            ->leftJoin('marketing_datas', 'marketing_states.marketing_states_id', '=', 'marketing_datas.marketing_states_id')
            ->groupBy('marketing_countries.marketing_countries_id')->get();

        foreach ($data['countries'] as $key => $val) {
            $data['countries'][$key]->marketing_countries_id = Helper::simple_encrypt($data['countries'][$key]->marketing_countries_id);
        }
//        $data['categories'] = MarketingCategory::select('marketing_categories_name', 'marketing_categories_id')->get();
        return json_encode($data);
    }

    public function postTimezonesView($id)
    {
        $id = Helper::simple_decrypt($id);

        $data['timezones'] = MarketingState::select(DB::raw('DISTINCT timezones.timezones_name,timezones.timezones_id'))
            ->leftJoin('timezones', 'timezones.timezones_id', '=', 'marketing_states.timezones_id')
            ->where('marketing_states.marketing_countries_id', '=', $id)->get();

        foreach ($data['timezones'] as $key => $val) {
            $time2 = date('Y-m-d H:i:s');
            $datetimePST = new DateTime($time2);
            $datetimePST->setTimezone(new DateTimeZone($data['timezones'][$key]->timezones_name));
            $pst = $datetimePST->format('d-m-Y h:i:s a');

            $data['timezones'][$key]->timezones_id = Helper::simple_encrypt($data['timezones'][$key]->timezones_id);
            $data['timezones'][$key]->timezones_time = strtotime($pst);
//            $data['timezones'][$key]->timezones_time = ($pst);
        }
//        $data['categories'] = MarketingCategory::select('marketing_categories_name', 'marketing_categories_id')->get();
        return json_encode($data);
    }

    public function getCreateTwoAdd()
    {
        return View::make('marketing_datas.create_two');
    }

    public function postStatesCategoriesAdd($id)
    {
        $id = Helper::simple_decrypt($id);
        $data['states'] = MarketingCountry::find($id)->marketing_states()->get();
        $data['categories'] = MarketingCategory::select('marketing_categories_name', 'marketing_categories_id')->get();
        return json_encode($data);
    }

    public function postStoreAdd()
    {
        $validation = Validator::make(Input::all(), MarketingData::$rules);

        if ($validation->fails()) {
            return json_encode([
                'code' => 403,
                'msg' => Config::get('constants.error_record_msg'),
                'result' => $validation->messages()
            ]);
        }

        $data = new MarketingData();
        $data->owner_name = Input::get('owner_name');
        $data->company_name = Input::get('company_name');
        $data->website = Input::get('website');
        $data->phone = Input::get('phone');
        $data->email = Input::get('email');
        $data->marketing_states_id = Input::get('marketing_states_id');
        $data->marketing_categories_id = Input::get('marketing_categories_id');
        $data->user_id = Auth::id();
        $data->leads_statuses_id = '1';
        $save = $data->save();
        if ($save) {
            return json_encode([
                'code' => 200,
                'msg' => Config::get('constants.store_record_msg'),
                'result' => null
            ]);
        } else {
            return json_encode([
                'code' => 403,
                'msg' => Config::get('constants.error_record_msg'),
                'result' => null
            ]);
        }
    }
}