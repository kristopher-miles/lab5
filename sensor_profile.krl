ruleset sensor_profile{
  meta{
	
    provides threshhold,location,phone,name
  }
  global{
    threshhold =ent:threshhold;
    location = ent:location;
    phone=ent:phone;
    name=ent:name;
  }
  rule intialization {
    select when wrangler ruleset_added where rids >< meta:rid
    if ent:threshhold.isnull() then noop();
    fired {
        ent:threshhold := 80;
        ent:location:="kitchen";
        ent:phone:="8184042075";
        ent:name:="Sensor 1";
    }
  }
  
  rule get_config {
    select when sensor get_config
    send_directive("say", {"something":{"name": ent:name,"location":ent:location,"phone":ent:phone,"threshhold":ent:threshhold}});
  }
  
  rule set_config{
    select when sensor profile_updated
    pre{
      new_thresh = event:attr("threshhold").defaultsTo(80);
      new_location = event:attr("location").defaultsTo("kitchen");
      new_phone = event:attr("phone").defaultsTo("8184042075");
      new_name = event:attr("name").defaultsTo("sensor 1");
    }
    
    send_directive("say",{"something":"update registered"});
    always{
      ent:threshhold:=new_thresh;
      ent:location:=new_location;
      ent:phone:=new_phone;
      ent:name:=new_name;
    }
  }

}
