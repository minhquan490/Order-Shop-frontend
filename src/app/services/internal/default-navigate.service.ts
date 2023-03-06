import { NavigateService } from "@service/navigate.service";

export class DefaultNavigateService implements NavigateService {

  public navigateTo(url: string): void {
    location.href = url;
  }

}
